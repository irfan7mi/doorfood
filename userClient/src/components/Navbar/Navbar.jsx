import React, { useState } from 'react'
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import Logout from '@mui/icons-material/Logout';

const Navbar = ({setShowLogIn}) => {
    const {totalFromCart, token, setToken, logIn, category, setCategory, foodData, setFoodData } = useContext(StoreContext)
    const [searchData, setSearchData] = useState("Food")
    const [menu, setMenu] = useState('home')

    const Logout = () => {
      localStorage.removeItem("token")
      setToken("")
    }
  return (
    <div className="navbar-container">
        <Link to={'/'} className='company-name'>DooRFooD</Link>
        <ul className="menu">
            <Link to={'/'} onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>home</Link>
            <a href='#menu-list' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
            <a href='#app-details' onClick={() => setMenu('about')} className={menu === 'about' ? 'active' : ''}>about</a>
            <a href='#app-details' onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>contact us</a>
        </ul>

        <div className='search-cart-sign'>
          <div className="search-box">
            <SearchIcon className='search-icon'></SearchIcon>
            <input className='search-input' type="text" onChange={(e) => {setCategory(e.target.value.toUpperCase()); setSearchData(e.target.value)}} placeholder='Search category...'/>
            <div className="search-food-container">
              <p className='search-food-text'>{searchData}</p>
              {foodData.map((food) => {
                if (category === "All" || category === food.category) {
                  return (
                <div className='search-food-data' onClick={() => setMenu('home')}>
                  <img src={food.image} alt="img" />
                  <a href='#menu-list' onClick={() => setMenu('menu')}>{food.name}</a>
                </div>
              )}})}
            </div>
          </div>
          {(logIn) ? <Link to={'/cart'}><ShoppingCartIcon className='cart' fontSize='medium'/>
          <div className={totalFromCart()===0 ? "no-cart" : "cart-status"}></div></Link> : <Link onClick={(e) => toast.error("SignIn your account!")}><ShoppingCartIcon className='cart'></ShoppingCartIcon>
          <div className={totalFromCart()===0 ? "no-cart" : "cart-status"}></div></Link>}
          {(token && logIn) ? 
          <div className='account-box-container'>
            <AccountCircleIcon fontSize='large' className='account-profile'/>
            <div className="account-box">
            <div className='account-box-content'>
              <MenuBookIcon fontSize='small'/>
              <Link to={'/PlaceOrder'}>Orders</Link>
            </div>
            <hr />
            <div className='account-box-content' onClick={Logout}>
              <LogoutIcon fontSize='small'/>
              <p>Logout</p>
            </div>
            </div>
          </div> : 
          <button className="sign-in" onClick={() => setShowLogIn(true)}>Log In</button>}
        </div>
    </div>
  )
}

export default Navbar;