import orderModel from "../models/order.js";
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import UserModel from "../models/user.js";

const stripe = new Stripe("sk_test_51PezAzBjbOSBdmXq32oGQgheZ6SGJnh4kJZgnBTx3UtqGYjOuTHf8H0kueKrTIWXwKM58fyEFjnD4dv0eubMIEX600Fn9QHRD9", {
  apiVersion: '2022-11-15',
});

const placeOrder = async (req, res) => {
  const frontend_url = "https://doorfood-app-user-client.vercel.app";
  try {
    if (!req.body.email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const newOrder = new orderModel({
      userId: req.body.userId,
      email: req.body.email,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: req.body.payment,
    });
    await newOrder.save();

    await UserModel.findByIdAndUpdate(req.body.userId, { cardData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe Session Created:", session);

    res.json({ success: true, message: "Processing...", session_url: session.url });

    const reviewData = req.body.items.map(item => ({
      orderId: newOrder._id,
      review: '',
      rating: 0,
    }));

    console.log("Review Data:", reviewData);

  } catch (e) {
    console.error("Error in placeOrder:", e.message, e.stack);
    res.status(500).json({ success: false, message: "Error processing order" });
  }
};

const paymentOrder = async (req, res) => {
  const frontend_url = "https://doorfood-app-user-client.vercel.app";
  const {items} = req.body;
  console.log("Data:",items)
  try {
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId`,
      cancel_url: `${frontend_url}/verify?success=false&orderId`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};


const orderList =  async (req, res) => {
  try {
    const orders = await orderModel.find(); // Ensure this query returns data
    res.json({ success: true, order: orders }); // Ensure the field is named `order`
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
}

const userOrderList = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    // Filter orders by userId
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders." });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.send({ success: true, message: "Status Updated!" });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "Error!" });
  }
};

export { placeOrder, paymentOrder, orderList, userOrderList, updateStatus };