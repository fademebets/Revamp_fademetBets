const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    let account = null;
    let role = null;

    // Check if email exists in Admin collection
    account = await Admin.findOne({ email });
    if (account) {
      role = 'admin';
    } else {
      // Check if email exists in User collection
      account = await User.findOne({ email });
      if (account) {
        role = 'user';
      }
    }

    if (!account) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    // ✅ Corrected: use userId key in JWT payload
    const tokenPayload = { userId: account._id, role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Prepare response
    const response = {
      message: `${role === 'admin' ? 'Admin' : 'User'} login successful.`,
      token,
      role
    };

    // If user, add subscription status
    if (role === 'user') {
      response.subscriptionStatus = account.subscriptionStatus;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
};
