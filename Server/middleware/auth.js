import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

  try {
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default authMiddleware;
