import React from 'react'
import './Header.css'
import { assets } from '../../AssetsImg/Assets.jsx'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h1 className='header-title'>Order your favorite foods here!</h1>
            <p>Welcome to DooRFooD! Explore a variety of mouthwatering cuisines, order your favorite meals, and enjoy fast doorstep delivery.</p>
            <a href='#menu-list' className='view-menu-btn'>VIEW MENU</a>
        </div>
    </div>
  )
}

export default Header