import React, { useContext, useState } from 'react'
import './Cart.css'
import PaymentForm from '../../payment/Payment.jsx';
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Cart = () => {
  const {userId, email, setEmail, food_list, cartItem, setCartItem, removeFromCart, totalFromCart, url} = useContext(StoreContext)
  const [promo, setPromo] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: email || "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const DELIVERY_FEE = 5;

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const calculateDeliveryFee = () =>
    totalFromCart() > 0 && totalFromCart() < 100 ? DELIVERY_FEE : 0;

  const placeOrder = async (e) => {
    e.preventDefault();

    if (Object.keys(cartItem).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    const orderItem = food_list
      .filter((item) => cartItem[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItem[item._id] }));
 
    const address = data;
    const items = orderItem;
    const amount = totalFromCart() + calculateDeliveryFee();
    const payment = "Yes";
  
    try {
      const response = await axios.post(`${url}/order/place`, {
        userId,
        email: data.email,
        items,
        address,
        amount,
        payment,
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        setShowPaymentForm(true); 
      } else {
        toast.error(response.data.message || "Order could not be processed!");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order!");
      console.error(error);
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentForm(false);
    setCartItem({}); 
    toast.success('Order placed successfully!');
  };

  return (
    <div className='cart-container'>
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Products</p>
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className='h-line'/>
        {Object.keys(cartItem).length > 0 && food_list.length > 0 ? (
          food_list.map((item, index) =>
            cartItem[item._id] > 0 ? (
              <div className="cart-item-title cart-item-list" key={index}>
                <img
                  src={`http://localhost:4000/images/${item.image}`}
                  className="cart-item-image"
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>₹{item.price * cartItem[item._id]}</p>
                <p className="remove-cart" onClick={() => removeFromCart(item._id)}>
                  X
                </p>
              </div>
            ) : null
          )
        ) : (
          <p>Your cart is empty.</p>
        )}
        <br />
      </div>
      <hr className='h-line'/>

      <div className="cart-bottom">
        <div>
          <h2 className='cart-heading'>Delivery Information</h2>
          <div className='delivery-details-container'>
            <div className='two-input'>
              <input type="text" placeholder='First name' name='firstName' value={data.firstName} onChange={eventHandler}/>
              <input type="text" placeholder='Last name' name='lastName' value={data.lastName} onChange={eventHandler}/>
            </div>
            <input type="text" name="email" value={data.email} placeholder='Email address' onChange={(e) => {eventHandler(e); setEmail(e.target.value);}}/>
            <div className='two-input'>
              <input type="text" placeholder='Street' name='street' value={data.street} onChange={eventHandler}/>
              <input type="text" placeholder='City' name='city' value={data.city} onChange={eventHandler}/>
            </div>
            <div className='two-input'>
              <input type="text" placeholder='Zip code' name='zipcode' value={data.zipcode} onChange={eventHandler}/>
              <input type="text" placeholder='Country' name='country' value={data.country} onChange={eventHandler}/>
            </div>
            <input type="text" placeholder='Phone' name='phone' value={data.phone} onChange={eventHandler}/>
          </div>
        </div>

        <div className="cart-promo-container">
        <div className="cart-total">
          <h2 className='cart-heading'>Cart Totals</h2>
          <div>
            <div className="calculate-details">
              <p>Subtotal</p>
              <p>₹{totalFromCart()}</p>
            </div>
            <hr className='h-line'/>
            <div className="calculate-details">
              <p>Delivery Fee</p>
              <p>₹{totalFromCart()>0 && totalFromCart()<100 ? 5 : 0}</p>
            </div>
            <hr className='h-line'/>
            <div className="calculate-details">
              <p className='total-amount'>Total</p>
              <p className='total-amount'>₹{totalFromCart() > 0 && totalFromCart() < 100 ? totalFromCart()+5 : totalFromCart()}</p>
            </div>
          </div>
          <p className='promo-content'>If you have a any promo code. <span onClick={() => setPromo(true)}>Click here.</span></p>
          {showPaymentForm ? (
            <PaymentForm onPaymentComplete={handlePaymentComplete}/>
          ) : (
            <>
              <div className="cart-items">
                {/* Cart items UI */}
                {/* ... */}
              </div>
              <button className="proceed-button" onClick={placeOrder}>
                PROCEED TO CHECKOUT
              </button>
            </>
          )}
        </div>
        {promo 
        ? <div className="promo-code-container">
            <p onClick={() => setPromo(false)} className='cancel-promo' >X</p>
            <p>If you have a promo code. Enter it.</p>
            <div className="promo-input">
              <input type="text" placeholder='Promo code'/>
              <button>Submit</button>
            </div>
          </div>
        : " "}
      </div>
      </div>
    </div>
  )
}

export default Cart