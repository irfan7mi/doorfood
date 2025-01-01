import React, { useContext, useState } from 'react'
import axios from 'axios'
import './Login.css'
import { StoreContext } from '../../../context/Context.jsx'
import { toast } from 'react-toastify'

const Login = () => {
    const {setToken, setEmail, setShowLogIn, url} = useContext(StoreContext)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const eventHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser(user => ({...user, [name]:value}))
    }

    const Submit = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${url}/admin/login`, user)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            toast.success(response.data.message)
            setShowLogIn(false)
        }
        else{
            toast.error(response.data.message)
        }
    }
    return (
    <div className="LogIn">
    <form className='LogIn-container' onSubmit={Submit}>
        <div className="LogIn-title">
            <h3>LogIn</h3>
            <button onClick={() => setShowLogIn(false)} className='cancel-btn'>X</button>
        </div>
        <div className="LogIn-inputs">
            <input type="text" name="email" value={user.email} onChange={(e) => {eventHandler(e); setEmail(e.target.value)}} placeholder='Enter your e-mail' required/>
            <input type="text" name='password' value={user.password} onChange={eventHandler} placeholder='Enter password' required minLength={8} maxLength={12}/>
            <button>LogIn</button>
        </div>
    </form>
    </div>
  )
}

export default Login