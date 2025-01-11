import mongoose from "mongoose";
import axios from "axios";
import FoodModel from "../models/food.js";

const isPeakHour = () => {
  const currentHour = new Date().getHours();
  return (currentHour >= 12 && currentHour <= 14) || (currentHour >= 19 && currentHour <= 21);
};

export const recommendedFood = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "userId is required" });
  }

  try {
    // Call the ML API for recommendations
    const response = await axios.post("https://doorfood-app-ml-ai.onrender.com/recommend", { userId });

    console.log("ML API Response Data:", response.data);

    if (response.status === 200) {
      const recommendedFoodIds = response.data.recommendations;

      if (!recommendedFoodIds || recommendedFoodIds.length === 0) {
        console.error("No recommendations returned from ML API.");
        return res.status(404).json({ success: false, message: "No recommendations from ML model" });
      }

      // Convert string IDs to ObjectId
      const objectIdArray = recommendedFoodIds.map((id) => mongoose.Types.ObjectId(id));

      // Fetch recommended foods from MongoDB
      const foods = await FoodModel.find({ _id: { $in: objectIdArray } });
      console.log("Foods Fetched from Database:", foods);

      if (foods.length === 0) {
        return res.status(404).json({ success: false, message: "No matching food items found" });
      }

      // Filter items with averageRating > 3.5
      const highRatedFoods = foods.filter((item) => item.averageRating > 3.5);

      // Apply dynamic pricing to high-rated foods
      const updatedFoodItems = highRatedFoods.map((item) => {
        let adjustedPrice = item.price;

        if (item.dynamicPricing && isPeakHour()) {
          const adjustment = Math.floor(item.price / item.peakHourMultiplier);
          adjustedPrice = item.price + adjustment;

          // Ensure the last digit of price is 0 or 5
          const lastDigit = adjustedPrice % 10;
          if (lastDigit !== 0 && lastDigit !== 5) {
            adjustedPrice += lastDigit < 5 ? (5 - lastDigit) : (10 - lastDigit);
          }
          adjustedPrice = Number(adjustedPrice.toFixed(2));
        }

        return {
          ...item.toObject(),
          price: adjustedPrice,
        };
      });

      // Send the updated food items to the frontend
      return res.json({ success: true, recommendations: updatedFoodItems });
    } else {
      console.error("Unexpected response from ML API:", response.data);
      return res.status(500).json({ success: false, message: "Failed to fetch recommendations from ML model" });
    }
  } catch (error) {
    console.error("Error during recommendation process:", error.message);

    if (error.response) {
      console.error("ML API Error Response:", error.response.data);
      return res.status(500).json({
        success: false,
        message: error.response.data.message || "Error fetching data from ML model",
      });
    }

    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};