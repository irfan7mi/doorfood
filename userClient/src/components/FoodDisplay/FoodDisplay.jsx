import React, { useContext, useState, useEffect } from "react";
import FoodItem from "../FoodItem/FoodItems";
import "./FoodDisplay.css";
import RecommendedFoods from "../Recommendation/RecommendedFood.jsx";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const FoodDisplay = () => {
  const { userId, category, url } = useContext(StoreContext);
  const [ foodData, setFoodData ] = useState([])

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(`${url}/food/list`);
        if (response.data.success) {
          console.log(response.data)
          setFoodData(response.data.data || []);
        } else {
          console.error("Failed to fetch foods: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
        setFoodData([]); // Set an empty list to prevent errors
      }
    };

    fetchFoodList();
  }, [setFoodData, url]); // Add dependencies to prevent warnings
  
  return (
    <div className="food-display">
      <h1>Welcome to DooRFooD</h1>
      <RecommendedFoods userId={userId} />
      <h1>All dishes near you...</h1>
      <div className="food-display-list">
        {foodData.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price} // Dynamic pricing
                averageRating={item.averageRating} // Dynamic rating
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;