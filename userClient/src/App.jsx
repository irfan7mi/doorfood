import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [showLogIn, setShowLogIn] = useState(false)
  return (
    <>
      {showLogIn?<Login setShowLogIn={setShowLogIn}/>:<></>}
      <div className="app">
        <ToastContainer/>
        <Navbar setShowLogIn={setShowLogIn}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
