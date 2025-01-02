import React, { useContext, useState } from 'react'
import axios from 'axios'
import './Login.css'
import { StoreContext } from '../../../context/StoreContext'
import { toast } from 'react-toastify'

const Login = ({setShowLogIn}) => {
    const [current, setCurrent] = useState('LogIn')
    const {setToken, setUserId, setEmail, setLogIn, setCartItem, url} = useContext(StoreContext)
    const [user, setUser] = useState({
        name: "",
        mobile: "",
        email: "",
        password: ""
    })
    let uri = `${url}/user/`;

    const eventHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser(user => ({...user, [name]:value}))
    }

    const Submit = async (e) => {
        e.preventDefault()
        if (current === "SignIn") {
            uri += "signin"
        }
        else{
            uri += "login"
        }
        const response = await axios.post(uri, user)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            toast.success(response.data.message)
            setUserId(response.data.userId)
            setCartItem(response.data.userCartData)
            setLogIn(true)
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
            <h3>{current}</h3>
            <button onClick={() => setShowLogIn(false)} className='cancel-btn'>X</button>
        </div>
        <div className="LogIn-inputs">
            {current == 'LogIn' ? <></> :
                <>
                    <input type="text" name='name' value={user.name} onChange={eventHandler} placeholder='Enter your name' required/>
                    <input type="text" name="mobile" value={user.mobile} onChange={eventHandler} placeholder='Enter your mobile number' required minLength={10} maxLength={10}/>
                </>}
            <input type="text" name="email" value={user.email} onChange={(e) => {eventHandler(e); setEmail(e.target.value)}} placeholder='Enter your e-mail' required/>
            <input type="text" name='password' value={user.password} onChange={eventHandler} placeholder='Enter password' required minLength={8} maxLength={12}/>
            <button>{current}</button>
        </div>
        <div className="LogIn-policy">
            <input type="checkbox" name="policy" className='check-box' required/>
            <p>I agree your terms, privacy & policy.</p>
        </div>
        {current=='LogIn' ? <p className='new-account'>Create a new account? <span onClick={() => setCurrent('SignIn')}>Click here</span></p>:<p className='new-account'>Already have an account? <span onClick={() => setCurrent('LogIn')}>LogIn here</span></p>}
    </form>
    </div>
  )
}

export default Login