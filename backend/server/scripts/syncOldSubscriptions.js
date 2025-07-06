require('dotenv').config();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for sync script'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function syncOldSubscriptions() {
  const users = await User.find({ stripeCustomerId: { $exists: true }, subscriptionId: { $exists: false } });

  console.log(`Found ${users.length} user(s) to sync.`);

  for (const user of users) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
        limit: 1
      });

      if (subscriptions.data.length > 0) {
        user.subscriptionId = subscriptions.data[0].id;
        await user.save();
        console.log(`✅ Updated subscriptionId for user: ${user.email}`);
      } else {
        console.log(`⚠️ No active subscription found for ${user.email}`);
      }
    } catch (err) {
      console.error(`❌ Error processing user ${user.email}:`, err.message);
    }
  }

  console.log('✅ Sync completed.');
  process.exit(0); // Close DB connection
}

syncOldSubscriptions();
