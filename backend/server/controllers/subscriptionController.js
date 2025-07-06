const User = require('../models/User');
const Stripe = require('stripe');
const PRICES = require('../config/prices');
const jwt = require('jsonwebtoken');
const { resend } = require('../config/resend'); // assuming you have this setup

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
exports.createCheckoutSession = async (req, res) => {
  try {
    const { email, plan } = req.body;
    if (!email || !plan) {
      return res.status(400).json({ message: 'Email and plan are required.' });
    }

    const priceId = PRICES[plan];
    if (!priceId) {
      return res.status(400).json({ message: 'Invalid subscription plan selected.' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `https://revamp-fademetbets.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'https://revamp-fademetbets.vercel.app',
    });

    res.json({ sessionId: session.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Confirm Subscription After Payment (Success Page Callback)
exports.confirmSubscription = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required.' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(400).json({ message: 'Invalid session ID.' });
    }

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed.' });
    }

    const customerId = session.customer;
    const subscriptionId = session.subscription;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscription) {
      return res.status(400).json({ message: 'Invalid subscription ID.' });
    }

    const invoice = await stripe.invoices.retrieve(subscription.latest_invoice);
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found for this subscription.' });
    }

    const periodEnd = invoice.lines.data[0].period.end;
    if (!periodEnd) {
      return res.status(500).json({ message: 'Could not retrieve subscription period end.' });
    }

    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.subscriptionStatus = subscription.status;
    user.subscriptionEndDate = new Date(periodEnd * 1000);
    await user.save();

    const role = 'user';

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        subscriptionStatus: 'active',
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // ✅ Send subscription confirmation email via Resend
    await resend.emails.send({
      from: 'FadeMeBets <no-reply@fademebets.com>',
      to: user.email,
      subject: 'Subscription Activated Successfully!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://www.fademebets.com/logo.png" alt="FadeMeBets" style="max-width: 160px;" />
  </div>

  <h2 style="color: #222;">Hi ${user.name || 'there'},</h2>

  <p style="font-size: 16px; line-height: 1.6; margin-top: 10px;">
    Your subscription has been <strong style="color: #4CAF50;">successfully activated 🎉</strong>
  </p>

  <p style="font-size: 16px; line-height: 1.6;">
    <strong>Plan:</strong> ${subscription.items.data[0].price.nickname}
  </p>

  <p style="font-size: 16px; line-height: 1.6;">
    <strong>Subscription valid until:</strong> ${new Date(periodEnd * 1000).toLocaleDateString()}
  </p>

  <br/>

  <p style="font-size: 16px; line-height: 1.6;">
    Thank you for choosing <strong>FadeMeBets 🚀</strong>
  </p>

  <div style="margin-top: 30px; text-align: center;">
    <a href="https://www.fademebets.com/userProfile" style="background-color: #4CAF50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">
      Visit Dashboard
    </a>
  </div>
</div>

      `
    });

    res.json({
      message: 'Subscription activated successfully.',
      subscriptionStatus: subscription.status,
      subscriptionEndDate: user.subscriptionEndDate,
      token,
      role
    });

  } catch (error) {
    console.error('❌ Confirm subscription error:', {
    message: error.message,
    stack: error.stack,
    response: error.response?.data || null
  });
  res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Customer Portal
exports.createCustomerPortal = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.stripeCustomerId) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: 'https://www.fademebets.com/dashboard',
    });

    res.json({ url: portalSession.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
