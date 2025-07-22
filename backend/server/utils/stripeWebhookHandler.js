const Stripe = require('stripe');
const User = require('../models/User');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET);

  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle subscription creation / update
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

    // Handle payment failed
    if (event.type === 'invoice.payment_failed') {
      const subscriptionId = event.data.object.subscription;
      const subs = await stripe.subscriptions.retrieve(subscriptionId);
      const customerId = subs.customer;

      const user = await User.findOne({ stripeCustomerId: customerId });
      if (user) {
        user.subscriptionStatus = 'past_due';
        await user.save();
      }
    }

    // 🟥 Handle upcoming invoices — apply referral discount if available
    if (event.type === 'invoice.upcoming') {
      const invoice = event.data.object;
      const customerId = invoice.customer;

      const user = await User.findOne({ stripeCustomerId: customerId });

      if (user && user.nextDiscountAmount > 0) {
        // Create one-time coupon based on nextDiscountAmount
        const coupon = await stripe.coupons.create({
          percent_off: user.nextDiscountAmount,
          duration: 'once',
        });

        // Attach discount to upcoming invoice
        await stripe.invoices.update(invoice.id, {
          discounts: [{ coupon: coupon.id }],
        });

        // Reset user's next discount since it's now used
        user.nextDiscountAmount = 0;
        user.nextDiscountType = null;
        await user.save();

        console.log(`✅ Applied ${coupon.percent_off}% discount to ${user.email}'s upcoming invoice`);
      }
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Webhook handling error:', error);
    res.status(500).send('Webhook handler error');
  }
};

module.exports = handleStripeWebhook;
