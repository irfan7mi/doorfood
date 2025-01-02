import React, { useContext } from "react";
import "./FoodItem.css";

import { StoreContext } from "../../../context/StoreContext";

const FoodItem = ({ id, name, image, description, price, averageRating }) => {
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
    console.log("IMG: ", img)
    return (
        <div className="food-display-container">
            <div className="food-img-cart-count">
                <img
                    className="food-img-container"
                    src={image} alt={item.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }
                    alt="Food Item"
                />
                { !cartItem[id] ? (
                    <p className="add-item-zero" onClick={(cartBool) => addToCart(id)}>
                        +
                    </p>
                ) : (
                    <div className="cart-item-container">
                        <p className="remove-item" onClick={(cartBool) => removeFromCart(id)}>
                            -
                        </p>
                        <p className="count-item">{cartItem[id]}</p>
                        <p className="add-item" onClick={(cartBool) => addToCart(id)}>
                            +
                        </p>
                    </div>
                 ) 
                }
            </div>
            <div className="food-info">
                <div className="food-display-title">
                    <p className="food-display-name">{name}</p>
                </div>
                <div className="food-display-details">
                    <p>{description}</p>
                </div>
                <div className="food-display-rating">
                    {averageRating !== undefined && averageRating !== null ? (
                        <>
                            <p className="rating">
                                ⭐ {averageRating.toFixed(1)} / 5
                            </p>
                            <p className="price-info">₹{price}</p>
                        </>
                    ) : (
                        <p className="no-rating">Not Rated Yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;