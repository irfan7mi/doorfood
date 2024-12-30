import express from "express";
import { recommendedFood } from "../controllers/recommendController.js"

const recommendRouter = express.Router();

recommendRouter.post("/food", recommendedFood);

export default recommendRouter;