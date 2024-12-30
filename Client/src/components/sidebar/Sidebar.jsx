import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Sidebar = () => {
  const [current, setCurrent] = useState("home")

  return (
    <div className='sidebar-container'>
      <div className='option-container'>
        <Link to={'/'} className={current=="home" ? 'active option' : 'option'} onClick={() => setCurrent("home")}><HomeIcon className='icon-img'/> HOME</Link>
        <Link to={'/add'} className={current=="addBook" ? 'active option' : 'option'} onClick={() => setCurrent("addBook")}><AddCircleIcon className='icon-img'/> ADD FOOD</Link>
        <Link to={'/list'} className={current=="book" ? 'active option' : 'option'} onClick={() => setCurrent("book")}><FastfoodIcon className='icon-img'/> FOODS</Link>
        <Link to={'/orders'} className={current=="orders" ? 'active option' : 'option'} onClick={() => setCurrent("orders")}><MenuBookIcon className='icon-img'/> ORDERS</Link>
    </div>
    </div>
  )
}

export default Sidebar
