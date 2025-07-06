const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded User ID:', decoded.userId);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found or deleted' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification or user lookup error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
