import authMiddleware from "../middleware/auth.js";
import express from 'express';
import addToCart from "../controllers/cartController.js";

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware, addToCart)
export default cartRouter