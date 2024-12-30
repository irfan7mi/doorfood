import express from 'express';
import { reviewAdd } from '../controllers/reviewController.js'; 

const reviewRouter = express.Router();

reviewRouter.post("/add", reviewAdd); 

export default reviewRouter;