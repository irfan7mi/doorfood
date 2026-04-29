import React, { useContext, useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItems.jsx";
import "./RecommendedFood.css";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext.jsx";

const RecommendedFoods = () => {
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const {url, userId} = useContext(StoreContext)

  useEffect(() => {
  if (!userId) return; // 🚨 important

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post(`${url}/api/recommend/food`, { userId });
      if (response.data.success) {
        setRecommendedFoods(response.data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    }
  };

  fetchRecommendations();
}, [userId]);

  return (
    <div className="recommended-foods-container">
      <h2>Recommended for You</h2>
      <div className="food-display-list">
        {recommendedFoods.length > 0 ? (
          recommendedFoods.map((food) => (
            <FoodItem
              key={food._id}
              id={food._id}
              name={food.name}
              image={food.image}
              description={food.description}
              price={food.price}
              averageRating={food.averageRating}
            />
          ))
        ) : (
          <p className="no-recommendations">No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedFoods;
