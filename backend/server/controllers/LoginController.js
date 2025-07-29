const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    let account = null;
    let role = null;

    account = await Admin.findOne({ email });
    if (account) {
      role = 'admin';
    } else {
      account = await User.findOne({ email });
      if (account) {
        role = 'user';
      }
    }

    if (!account) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const tokenPayload = { userId: account._id, role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    const response = {
      message: `${role === 'admin' ? 'Admin' : 'User'} login successful.`,
      token,
      role,
      userId: account._id,
      email: account.email // 👈 Email added here
    };

    if (role === 'user') {
      response.subscriptionStatus = account.subscriptionStatus;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
};
