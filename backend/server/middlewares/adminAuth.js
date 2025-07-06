const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check role from token first
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Admin access only.' });
    }

    const admin = await Admin.findById(decoded.userId);   // ✅ read userId, not id
    if (!admin) return res.status(401).json({ message: 'Invalid token. Admin not found.' });

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Admin Auth Error:', err);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = adminAuth;
