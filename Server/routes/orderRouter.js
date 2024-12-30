import express from 'express'
import { placeOrder, paymentOrder, userOrderList, orderList, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post("/place", placeOrder)
orderRouter.post("/payment", paymentOrder)
orderRouter.get("/list", orderList)
orderRouter.post("/list/userOrder", userOrderList)
orderRouter.post("/update/status", updateStatus)

export default orderRouter