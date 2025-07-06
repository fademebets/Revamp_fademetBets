require('dotenv').config();
const mongoose = require('mongoose');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for end date fix script'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function fixSubscriptionEndDates() {
  const users = await User.find({
    subscriptionStatus: 'active',
    subscriptionId: { $exists: true, $ne: null },
    subscriptionEndDate: { $exists: false }
  });

  console.log(`Found ${users.length} user(s) to update.`);

  for (const user of users) {
    try {
      const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);

      if (!subscription) {
        console.log(`❌ No subscription found on Stripe for ${user.email}`);
        continue;
      }

      if (!subscription.current_period_end) {
        console.log(`⚠️ Subscription for ${user.email} has no current_period_end.`);
        continue;
      }

      const endDate = new Date(subscription.current_period_end * 1000);

      if (isNaN(endDate)) {
        console.log(`⚠️ Invalid Date generated for ${user.email}. Skipping.`);
        continue;
      }

      user.subscriptionEndDate = endDate;
      await user.save();

      console.log(`✅ Updated subscriptionEndDate for user: ${user.email}`);
    } catch (err) {
      console.error(`❌ Error processing user ${user.email}: ${err.message}`);
    }
  }

  console.log('✅ End date update completed.');
  process.exit(0);
}

fixSubscriptionEndDates();
