const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/confirm-session', async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const stripeCustomerId = session.customer;

    const user = await User.findOne({ stripeCustomerId });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create JWT
   const token = jwt.sign(
  { userId: user._id, email: user.email },  // 👈 changed `id` to `userId`
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);


    res.json({ token });
  } catch (error) {
    console.error('Error confirming session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
