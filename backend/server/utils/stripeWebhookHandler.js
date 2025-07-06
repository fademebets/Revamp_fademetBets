const Stripe = require('stripe');
const User = require('../models/User');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      const user = await User.findOne({ stripeCustomerId: customerId });
      if (user) {
        user.subscriptionStatus = subscription.status;
        user.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
        await user.save();
      }
    }

    if (event.type === 'invoice.payment_failed') {
      const subscription = event.data.object.subscription;
      const subs = await stripe.subscriptions.retrieve(subscription);
      const customerId = subs.customer;

      const user = await User.findOne({ stripeCustomerId: customerId });
      if (user) {
        user.subscriptionStatus = 'past_due';
        await user.save();
      }
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook handling error:', error);
    res.status(500).send('Webhook handler error');
  }
};

module.exports = handleStripeWebhook;
