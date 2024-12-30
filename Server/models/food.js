import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  dynamicPricing: {type: Boolean, required: true},
  peakHourMultiplier: { type: Number },
  price: { type: Number, required: true },
  category: { type: String, required: true, uppercase: true },
  ratings: { type: Array, default: [] },
  averageRating: { type: Number, default: 0 }
});

const FoodModel = mongoose.model("foods", foodSchema);
export default FoodModel;