import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers.Authorization;
  if (authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again!' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information (e.g., id) to the request for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default authMiddleware;
