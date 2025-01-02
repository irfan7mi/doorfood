import "./List.css"
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import { StoreContext } from "../../../context/Context"

const List = () => {
  const [data, setData] = useState([])
  const {url} = useContext(StoreContext)

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/food/list")
    console.log(response.data.data)
    setData(response.data.data)
  }

  useEffect(() => { 
    async function loadData() {
      await fetchFoodList()
    }
    loadData()
  },[])

  const handleDelete = async (id) => {
    const response = await axios.post(`${url}/food/delete/`+id)
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchFoodList()
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='food-list-container'>
      <h3 className='food-list-title'>Food List</h3>
      <table className='food-list-table'>
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Action</th>
        </thead>
        <tbody>
      {data.map((item, index) => (
      <tr key={item._id}> 
        <td><img src={item.image} alt={item.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }} className="food-img"/></td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td className='btn-container'><Link to={`/list/${item._id}`} className='update-btn'>UPDATE</Link><button className='delete-btn' onClick={(e) => handleDelete(item._id)}>REMOVE</button></td>
      </tr>
      ))}
      </tbody>
      </table>
    </div>
  )
}

export default List
