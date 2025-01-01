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

  const sampleAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkwOTA5MjAwLCJleHAiOjE2OTA5MTI4MDB9.aWyHCp-sTExaTdvFZ7WoQZPi3tWqCyIK4F2fSjSjOGg";

  localStorage.setItem("adminToken", sampleAdminToken);
  const adminApiClient = axios.create({
    baseURL: "https://doorfood-app-server-ohcg4cyhm-irfans-projects-878c5a63.vercel.app/",
  });

  adminApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const fetchAdminToken = async () => {
    try {
      const response = await axios.get(`${url}/generate-admin-token`);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
      } else {
        console.error("Failed to fetch admin token");
      }
    } catch (error) {
      console.error("Error fetching admin token:", error);
    }
  };

  const fetchCount = async () => {
    const fetchUserList = async () => {
      const response = await adminApiClient.get(url+"/user/list")
      setUserCount(response.data.userCount)
    }
    const fetchFoodList = async () => {
      const response = await adminApiClient.get("https://doorfood-app-server-ohcg4cyhm-irfans-projects-878c5a63.vercel.app/food/list")
      console.log("API Response:", response.data);
      setFoodCount(response.data.foodCount)
    }
    const fetchOrderList = async () => {
      const response = await adminApiClient.get(url+"/order/list")
      setOrderCount(response.data.orderCount)
    }
    await fetchUserList()
    await fetchFoodList()
    await fetchOrderList()
  }

  useEffect(() => {
    async function initialize() {
      await fetchAdminToken(); // Fetch and store the token
      await fetchCount(); // Load counts
    }
    initialize();
  }, []);

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
