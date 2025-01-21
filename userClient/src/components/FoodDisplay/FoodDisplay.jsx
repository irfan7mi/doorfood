import React, { useContext, useState, useEffect } from "react";
import FoodItem from "../FoodItem/FoodItems";
import "./FoodDisplay.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import RecommendedFoods from '../Recommendation/RecommendedFood'

const FoodDisplay = () => {
  const { category, url } = useContext(StoreContext);
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
  }, [setFoodData, url]); 
  
  return (
    <div className="food-display">
      <RecommendedFoods/>
      <h1>Delicious dishes, freshly made and delivered right to your doorstep!</h1>
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
                price={item.price} 
                averageRating={item.averageRating} 
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;