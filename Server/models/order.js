import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  email: {type:String, required: true, lowercase: true},
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
    },
  ],
  amount: Number,
  status: { type: String, default: "Pending" },
  payment: String,
  reviewed: { type: Boolean, default: false },
  deliveryRating: { type: Number, default: null },
  deliveryReview: { type: String, default: "" },
  address: {type: Object, required: true }
});

const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;