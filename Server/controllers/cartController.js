import UserModel from '../models/user.js'

const addToCart = async (req, res) => {
  try{
    let userData = await UserModel.findById(req.body.userId)
    let cartData = await userData.cartData
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1
    }
    else{
      cartData[req.body.itemId] += 1
    }
    await UserModel.findByIdAndUpdate(req.body.userId, {cartData})
    res.send({success: true, message: "Add To Cart"})
  }
  catch(e) {
    console.log(e)
    res.send({success: false, message: "Error"})
  }
}

export default addToCart