const User = require('../models/User');
const Stripe = require('stripe');
const PRICES = require('../config/prices');
const jwt = require('jsonwebtoken');
const resend = require('../config/resend');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getReferralDiscount = (plan) => {
  const discountMap = {
    monthly: 50,
    quarterly: 25,
    yearly: 20,
  };
  return discountMap[plan] || 0;
};

// Create Checkout Session
exports.createCheckoutSession = async (req, res) => {
  try {
    const { email, plan, referralCode } = req.body;

    if (!email || !plan) {
      return res.status(400).json({ message: "Email and plan are required." });
    }

    const priceId = PRICES[plan];
    if (!priceId) {
      return res.status(400).json({ message: "Invalid subscription plan selected." });
    }

    // Find or create user
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

    let couponId = null;

    // 🟥 Referral Code Handling
    if (referralCode) {
      const referringUser = await User.findOne({
        referralCode,
        referralCodeExpiry: { $gt: Date.now() },
      });

      if (!referringUser) {
        return res.status(400).json({ message: "Invalid or expired referral code." });
      }

      // Check if referring user has already referred someone
      if (referringUser.hasReferredUser) {
        return res.status(400).json({ message: "This referral code has already been used." });
      }

      // Create 10% one-time coupon for referred user
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: "once",
      });
      couponId = coupon.id;

      // ✅ Apply referral reward based on their subscriptionPlan (not subscriptionStatus)
      const discount = getReferralDiscount(referringUser.subscriptionPlan);

      // Update referring user with reward details
      referringUser.hasReferredUser = true;
      referringUser.nextDiscountAmount = discount;
      referringUser.nextDiscountType = referringUser.subscriptionPlan;
      await referringUser.save();

      // Mark new user as referred by this code
      user.referredBy = referralCode;
      await user.save();
    }

    // ✅ Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      discounts: couponId ? [{ coupon: couponId }] : [],
      success_url: `https://www.fademebets.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://www.fademebets.com/",
       metadata: {
        plan, // this will be 'monthly' / 'quarterly' / 'yearly'
        email
      }
    });

    res.json({ sessionId: session.id });

  } catch (error) {
    console.error("❌ createCheckoutSession error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Confirm Subscription After Payment (Success Page Callback)
exports.confirmSubscription = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required.' });
    }

    // Retrieve session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(400).json({ message: 'Invalid session ID.' });
    }

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed.' });
    }

    const customerId = session.customer;
    const subscriptionId = session.subscription;

    // Retrieve subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("🔴 Stripe Subscription Status:", subscription.status);

    // Retrieve invoice
    const invoice = await stripe.invoices.retrieve(subscription.latest_invoice);
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found for this subscription.' });
    }

    const periodEnd = invoice.lines.data[0].period.end;
    if (!periodEnd) {
      return res.status(500).json({ message: 'Could not retrieve subscription period end.' });
    }

    // Find user by stripeCustomerId
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user's subscription details
    user.subscriptionStatus = 'active';
    user.subscriptionId = subscriptionId;
    user.subscriptionEndDate = new Date(periodEnd * 1000);

    // ✅ Set subscriptionPlan from session metadata if available
    const plan = session.metadata?.plan;
    if (plan) {
      user.subscriptionPlan = plan;
    }

    await user.save();

    const role = 'user';

    // Create JWT with active status
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

    // Send subscription confirmation email via Resend
    await resend.emails.send({
      from: 'FadeMeBets <no-reply@fademebets.com>',
      to: user.email,
      subject: 'Subscription Activated Successfully!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.fademebets.com/logo.png" alt="FadeMeBets" style="max-width: 160px;" />
          </div>

          <h2 style="color: #c8102e;">Hi ${user.firstName || 'there'},</h2>

          <p style="font-size: 16px; line-height: 1.6; margin-top: 10px;">
            Your subscription has been <strong style="color: #c8102e;">successfully activated 🎉</strong>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Subscription valid until:</strong> ${new Date(periodEnd * 1000).toLocaleDateString()}
          </p>

          <br/>

          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for choosing <strong style="color: #c8102e;">FadeMeBets 🚀</strong>
          </p>

          <div style="margin-top: 30px; text-align: center;">
            <a href="https://www.fademebets.com/userProfile" style="background-color: #c8102e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">
              Visit Dashboard
            </a>
          </div>
        </div>
      `
    });

    // Return success response
    res.json({
      message: 'Subscription activated successfully.',
      subscriptionStatus: 'active',
      subscriptionPlan: user.subscriptionPlan,
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
