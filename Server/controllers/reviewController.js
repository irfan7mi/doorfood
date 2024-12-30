import FoodModel from "../models/food.js";
import OrderModel from "../models/order.js";

const reviewAdd = async (req, res) => {
  const { orderId, reviews, deliveryReview, deliveryRating } = req.body;

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    if (order.reviewed) {
      return res.status(400).json({ success: false, message: "Order already reviewed." });
    }
    if (typeof deliveryRating !== "number" || deliveryRating < 1 || deliveryRating > 5) {
      return res.status(400).json({ success: false, message: "Invalid delivery rating. Must be a number between 1 and 5." });
    }

    // Update delivery review and rating
    order.deliveryReview = (deliveryReview || "").trim();
    order.deliveryRating = Number(deliveryRating);

    // Update food reviews
    if (reviews && Array.isArray(reviews)) {
      for (const { foodId, rating } of reviews) {
        if (!foodId || typeof rating !== "number" || rating < 1 || rating > 5) {
          continue; // Skip invalid entries
        }

        const food = await FoodModel.findById(foodId);
        if (food) {
          // Add the new rating
          food.ratings.push(rating);

          // Calculate the average rating directly
          const totalRatings = food.ratings.length;
          const sumOfRatings = food.ratings.reduce((sum, current) => sum + current, 0);

          // Average = Total Sum of Ratings / Number of Ratings
          food.averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

          // Save the updated food document
          await food.save();
        }
      }
    }

    order.reviewed = true;
    await order.save();

    res.status(200).json({ success: true, message: "Reviews submitted successfully." });
  } catch (error) {
    console.error("Error adding reviews:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body,
    });
    res.status(500).json({ success: false, message: "An internal error occurred." });
  }
};

export { reviewAdd };