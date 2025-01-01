import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random#secret");
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token!" });
  }
};


export default authMiddleware;
