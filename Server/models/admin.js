import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: {type:String, required:true, lowercase: true, unique: true},
  password: {type:String, required:true},
})

const AdminModel = mongoose.model("admin", adminSchema)
export default AdminModel