import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar-container'>
      <div className='profile-container'>
        <div className='profile-img'>M</div>
        <div className='account-profile'>
          <h3>Mohamed Irfan</h3>
        </div>
      </div>
      <button className='login-btn' onClick={() => {navigate('/'); setShowLogIn(true)}}>SignIn</button>
    </div>
  )
}

export default Navbar