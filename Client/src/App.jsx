import './App.css'
import Add from './components/add/Add'
import UpdateItem from './components/add/UpdateItem'
import Home from './components/home/Home'
import List from './components/list/List'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Orders from './components/order/Orders'
import { StoreContext } from '../context/Context'
import { useContext } from 'react'
import Login from './components/login/Login'

function App() {
  const {showLogIn} = useContext(StoreContext)
  return (
    <div>
      <ToastContainer/>
      {showLogIn ? <Login/> : <></>}
      <Navbar/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/list/:id' element={<UpdateItem/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
