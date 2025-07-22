const Stripe = require('stripe');
const User = require('../models/User');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  console.log('🔔 Received webhook call');
  console.log('📩 Signature:', sig);

  let event;
  try {
    console.log('⚙️ Constructing Stripe event with raw body...');
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Event constructed:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        const subscription = event.data.object;
        const customerId = subscription.customer;
        console.log(`🔄 Handling ${event.type} for customer ${customerId}`);

        const user = await User.findOne({ stripeCustomerId: customerId });
        if (user) {
          user.subscriptionStatus = subscription.status;
          user.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
          await user.save();
          console.log(`✅ Updated subscription status for user: ${user.email}`);
        } else {
          console.warn(`⚠️ No user found with stripeCustomerId: ${customerId}`);
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        const subscriptionId = failedInvoice.subscription;
        const subs = await stripe.subscriptions.retrieve(subscriptionId);
        const failedCustomerId = subs.customer;
        console.log(`🚫 Payment failed for subscription: ${subscriptionId}`);

        const failedUser = await User.findOne({ stripeCustomerId: failedCustomerId });
        if (failedUser) {
          failedUser.subscriptionStatus = 'past_due';
          await failedUser.save();
          console.log(`❗ Marked user as past_due: ${failedUser.email}`);
        }
        break;

      case 'invoice.upcoming':
        const invoice = event.data.object;
        const invoiceCustomerId = invoice.customer;
        const invoiceUser = await User.findOne({ stripeCustomerId: invoiceCustomerId });

        console.log(`📅 Upcoming invoice for: ${invoiceCustomerId}`);

        if (invoiceUser && invoiceUser.nextDiscountAmount > 0) {
          const coupon = await stripe.coupons.create({
            percent_off: invoiceUser.nextDiscountAmount,
            duration: 'once',
          });

          await stripe.invoices.update(invoice.id, {
            discounts: [{ coupon: coupon.id }],
          });

          invoiceUser.nextDiscountAmount = 0;
          invoiceUser.nextDiscountType = null;
          await invoiceUser.save();

          console.log(`✅ Applied ${coupon.percent_off}% discount to ${invoiceUser.email}'s upcoming invoice`);
        }
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Webhook handling error:', error);
    res.status(500).send('Webhook handler error');
  }
};



module.exports = handleStripeWebhook;
