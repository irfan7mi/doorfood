import "./Add.css"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import { StoreContext } from "../../../context/Context"
import { useNavigate, useParams } from "react-router-dom"

const UpdateItem = () => {
  const {image, setImage, data, setData, url, imgURL} = useContext(StoreContext)
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(data)

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/food/list/`+id)
    setData(response.data.data)
  }

  useEffect(() => { 
    async function loadData() {
      await fetchFoodList()
    }
    loadData()
  },[])

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const Submit = async (e) => {
    e.preventDefault()
    const formData =new FormData()
    formData.append("image", image)
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    const response = await axios.post(`${url}/food/list/update/`+id, formData)
    if (response.data.success) {
      setData({
        name: "", 
        description: "", 
        price: "", 
        category: "Burger"
      })   
      setImage(false)
      navigate('/list')
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className="add-page">
      <form  onSubmit={Submit} className="add-container">
      <div className="add-item-container">
        <label htmlFor="">Upload Image</label>
        <input type="file" name="image" className="input-image" onChange={(e) => setImage(e.target.files[0])} required/>
        {image ? <label htmlFor=""> <img src={image ? `${imgURL}`+data.image : ""} className="preview-img"/></label> : <> </>}
        <label htmlFor="">Product name</label>
        <input type="text" name="name" value={data.name}  placeholder="Enter food name..." onChange={eventHandler} required/>
        <label htmlFor="">Product description</label>
        <textarea name="description" id="" value={data.description} placeholder="Ender food description..." onChange={eventHandler} required></textarea>
        <div className="price-category-container">
          <div className="price-container"> 
            <label htmlFor="" >Product price</label>
            <input type="number" name="price" className="price-input" value={data.price} placeholder="Enter food price..." onChange={eventHandler} required/>
          </div>
          <div className="category-container">
            <label htmlFor="">Product category</label>
            <select name="category" value={data.category} onChange={eventHandler}>
              <option value="BURGER">Burger</option>
              <option value="PIZZA">Pizza</option>
              <option value="SEAFOODS">Seafoods</option>
              <option value="NOODLES">Noodles</option>
              <option value="SHAWARMA">Shawarma</option>
              <option value="CHICKEN">Chicken</option>
              <option value="MUTTON">Mutton</option>
              <option value="PORATTA">Poratta</option>
              <option value="PASTA">Pasta</option>
              <option value="SNACKS">Snacks</option>
              <option value="SANDWISH">Sandwish</option>
              <option value="DESERT">Desert</option>
              <option value="SALAD">Salad</option>
            </select>
          </div>
        </div>
        <button className="button">Submit</button>
      </div>
      </form>
    </div>
  )
}

export default UpdateItem
