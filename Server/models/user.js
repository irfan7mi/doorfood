import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {type:String, required:true},
  mobile: {type:Number, required:true},
  email: {type:String, required:true, lowercase: true, unique: true},
  password: {type:String, required:true},
  cartData: {type:Object, default: {}}
}, {minimize: false})

const UserModel = mongoose.model("users", userSchema)
export default UserModel