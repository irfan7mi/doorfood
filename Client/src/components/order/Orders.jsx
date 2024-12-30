import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../../context/Context'
import axios from "axios"
import { toast } from 'react-toastify'

const Orders = () => {
  const [orderData, setOrderData] = useState([])
  const {url} = useContext(StoreContext)

  const fetchOrderList = async () => {
    const response = await axios.get(url+"/order/list")
    setOrderData(response.data.order)
    console.log(response.data)
  }

  useEffect(() => {
    async function loadData() {
      await fetchOrderList()
    }
    loadData()
  }, [])

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url+"/order/update/status", {
      orderId,
      status : e.target.value
    })
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchOrderList()
    } 
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>
      <div className='order-container'>
      <div className="order-items">
        <div className="order-item-title">
          <p>Products</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Payment</p>
          <p>Address</p>
        </div>
        <hr className='h-line'/>
        {orderData.map((item,index)=> {
          return(
            <div className="order-item-title order-item-list" key={index}>
              <p>{item.items.map((data,index)=> {
                if(index === data.length-1){
                  return data.name+" x "+data.quantity
                }
                else{
                  return data.name+" x "+data.quantity+", "
                }
              })}</p>
              <p>₹{item.amount}</p>
              <p><select onChange={(e) => statusHandler(e, item._id)} value={item.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Status</option>
                <option value="Delivered">Delivered</option>
              </select></p>
              <p>{item.payment}</p>
              <p>{item.address.street} - {item.address.city}</p>
            </div>
          )
        })}
        <br />
      </div>
      </div>
    </div>
  )
}

export default Orders;