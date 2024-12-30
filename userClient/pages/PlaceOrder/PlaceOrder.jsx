import "./PlaceOrder.css";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [feedbackBool, setFeedbackBool] = useState(false)
  const [feedbackVisible, setFeedbackVisible] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const {userId, url} = useContext(StoreContext)

  const fetchOrderList = async () => {
    try {
      if (!userId) {
        toast.error("User ID is missing!");
        return;
      }
  
      const response = await axios.post(`${url}/order/list/userOrder`, { userId }); // Ensure userId is passed
      setOrderData(response.data.orders);
    } catch (error) {
      console.error("Error fetching order list:", error);
      toast.error("Failed to fetch order list.");
    }
  };

  const handleFeedbackToggle = (orderId) => {
    setFeedbackVisible((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleFeedbackChange = (key, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleFeedbackSubmit = async (orderId) => {
    const order = orderData.find((order) => order._id === orderId);
    if (!order) return;

    const reviews = order.items
      .map((item) => {
        const { rating } = feedbackData[`${orderId}-${item._id}`] || {};
        if (rating) {
          return { foodId: item._id, rating };
        }
        return null;
      })
      .filter((review) => review !== null);

    const deliveryReview = feedbackData[`${orderId}-deliveryReview`]?.review || "";
    const deliveryRating = feedbackData[`${orderId}-deliveryRating`]?.rating || null;

    if (!deliveryRating || deliveryRating < 1 || deliveryRating > 5) {
      toast.error("Please provide a valid delivery rating (1-5).");
      return;
    }

    try {
      const response = await axios.post(`${url}/review/add`, {
        orderId,
        reviews,
        deliveryReview,
        deliveryRating,
      });

      if (response.data.success) {
        toast.success("Feedback submitted successfully!");
        setFeedbackVisible((prev) => ({
          ...prev,
          [orderId]: false,
        }));
        fetchOrderList(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback.");
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div>
      <div className="order-container">
        <div className="order-items">
          <div className="order-item-title">
            <p>Products</p>
            <p>Amount</p>
            <p>Status</p>
            <p>Payment</p>
            <p></p>
          </div>
          <hr className="h-line" />
          {orderData.map((order) => (
            <div key={order._id} className="order-item-list">
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>₹{order.amount}</p>
              <p>{order.status}</p>
              <p>{order.payment}</p>
              {order.status === "Delivered" && (
              <>
                <button
                  className="feedback-button"
                  onClick={() => handleFeedbackToggle(order._id)}
                >
                  {feedbackVisible[order._id] ? "Hide Feedback" : "Feedback"}
                </button>
                {feedbackVisible[order._id] && (
                  <div className="feedback-container">
                    <h4>Rate Your Experience</h4>
                    {order.items.map((item) => (
                      <div key={item._id}>
                        <p>{item.name}</p>
                        <select
                          value={
                            feedbackData[`${order._id}-${item._id}`]?.rating || ""
                          }
                          onChange={(e) =>
                            handleFeedbackChange(
                              `${order._id}-${item._id}`,
                              "rating",
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value="">Rate</option>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <textarea
                      placeholder="Delivery Experience"
                      value={
                        feedbackData[`${order._id}-deliveryReview`]?.review || ""
                      }
                      onChange={(e) =>
                        handleFeedbackChange(
                          `${order._id}-deliveryReview`,
                          "review",
                          e.target.value
                        )
                      }
                    ></textarea>
                    <select
                      value={
                        feedbackData[`${order._id}-deliveryRating`]?.rating || ""
                      }
                      onChange={(e) =>
                        handleFeedbackChange(
                          `${order._id}-deliveryRating`,
                          "rating",
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value="">Rate Delivery</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      className="feedback-button"
                      onClick={() => handleFeedbackSubmit(order._id)}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </>
            )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;