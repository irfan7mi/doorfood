import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const {token} = req.headers
  if(!token) {
    return res.send({success:false, message:"Not Authorized Login Again!"})
  }
  try{
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = "668e35f2609907b17d7ac1f2"
    next()
  }
  catch(e) {
    console.log(e)
    return res.send({success:false, message: "Error"})
  }
}

export default authMiddleware