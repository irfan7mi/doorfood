import "./Add.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/Context.jsx";

const Add = () => {
  const [image, setImage] = useState(false);
  const {url} = useContext(StoreContext)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Burger",
    dynamicPricing: false,
    peakHourMultiplier: 5,
  });

  const eventHandler = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("dynamicPricing", data.dynamicPricing);
    formData.append("peakHourMultiplier", data.peakHourMultiplier);
    formData.append("averageRating", null); // Add initial null rating

    try {
      const response = await axios.post(`${url}/add`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },});
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Burger",
          dynamicPricing: false,
          peakHourMultiplier: 0.05,
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item.");
    }
  };

  return (
    <div className="add-page">
      <form onSubmit={Submit} className="add-container">
        <div className="add-item-container">
          <label htmlFor="">Upload Image</label>
          <input
            type="file"
            name="image"
            className="input-image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          {image ? (
            <label htmlFor="">
              <img
                src={image ? URL.createObjectURL(image) : ""}
                className="preview-img"
              />
            </label>
          ) : (
            <> </>
          )}

          <label htmlFor="">Product name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Enter food name..."
            onChange={eventHandler}
            required
          />

          <label htmlFor="">Product description</label>
          <textarea
            name="description"
            value={data.description}
            placeholder="Enter food description..."
            onChange={eventHandler}
            required
          ></textarea>

          <div className="price-category-container">
            <div className="price-container">
              <label htmlFor="">Product price</label>
              <input
                type="number"
                name="price"
                className="price-input"
                value={data.price}
                placeholder="Enter food price..."
                onChange={eventHandler}
                required
              />
            </div>
            <div className="category-container">
              <label htmlFor="">Product category</label>
              <select name="category" value={data.category} onChange={eventHandler}>
                <option value="burger">Burger</option>
                <option value="pizza">Pizza</option>
                <option value="seafoods">Seafoods</option>
                <option value="noodles">Noodles</option>
                <option value="shawarma">Shawarma</option>
                <option value="chicken">Chicken</option>
                <option value="mutton">Mutton</option>
                <option value="poratta">Poratta</option>
                <option value="pasta">Pasta</option>
                <option value="snacks">Snacks</option>
                <option value="sandwich">Sandwich</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
          </div>

          <div className="dynamic-pricing-container">
            <label htmlFor="dynamicPricing">Enable Dynamic Pricing</label>
            <input
              type="checkbox"
              name="dynamicPricing"
              checked={data.dynamicPricing}
              onChange={eventHandler}
            />
            {data.dynamicPricing && (
              <div className="peak-hour-container">
                <label htmlFor="peakHourMultiplier">Peak Hour Multiplier</label>
                <input
                  type="number"
                  name="peakHourMultiplier"
                  value={data.peakHourMultiplier}
                  onChange={eventHandler}
                  min="5"
                  step="5"
                  required
                />
              </div>
            )}
          </div>

          <button className="button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Add;