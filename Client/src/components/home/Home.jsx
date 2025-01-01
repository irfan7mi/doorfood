import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { StoreContext } from '../../../context/Context';
import axios from 'axios';

const Home = () => {
  const [foodCount, setFoodCount] = useState("")
  const [orderCount, setOrderCount] = useState("")
  const [userCount, setUserCount] = useState("")
  const {url} = useContext(StoreContext)

  const fetchCount = async () => {
    const fetchUserList = async () => {
      const response = await axios.get(url+"/user/list")
      setUserCount(response.data.userCount)
    }
    const fetchFoodList = async () => {
      const response = await axios.get("url"+"/food/list")
      setFoodCount(response.data.foodCount)
    }
    const fetchOrderList = async () => {
      const response = await axios.get(url+"/order/list")
      setOrderCount(response.data.orderCount)
    }
    await fetchUserList()
    await fetchFoodList()
    await fetchOrderList()
  }

  useEffect(() => { 
    async function loadData() {
      await fetchCount()
    }
    loadData()
  },[])

  return (
    <div className='home-page'>
      <div className='home-container'>
        <div className="count-details">
          <div className="count-container">
            <FastfoodIcon fontSize='large' className='icon-image'/>
            <div className="text-container">
              <h3>{foodCount} FOODS</h3>
              <div className={(foodCount>5) ? 'statusFull status' : 'statusLow'}></div>
            </div>
          </div>
          <div className="count-container">
            <FastfoodIcon fontSize='large' className='icon-image'/>
            <div className="text-container">
              <h3>{userCount} USERS</h3>
              <div className={(userCount>5) ? 'statusFull status' : 'statusLow status' }></div>
            </div>
          </div>
          <div className="count-container">
            <FastfoodIcon fontSize='large' className='icon-image'/>
            <div className="text-container">
              <h3>{orderCount} ORDERS</h3>
              <div className={(orderCount>5) ? 'statusFull status' : 'statusLow status'}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
