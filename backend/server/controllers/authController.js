const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resend = require('../config/resend');



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = code;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const { data, error } = await resend.emails.send({
      from: 'FadeMeBets <no-reply@fademebets.com>',
      to: email,
      subject: 'FadeMeBets Password Reset Code',
      html: `
        <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; background: #f9f9f9;">
          <h2 style="color: #c8102e;">Password Reset Code</h2>
          <p style="font-size: 16px; color: #333;">Your password reset code is:</p>
          <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #000;">${code}</div>
          <p style="font-size: 14px; color: #555;">This code will expire in 10 minutes.</p>
          <p style="font-size: 13px; color: #999; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    console.log(`✅ Reset code sent to: ${email}`);
    res.json({ message: 'Reset code sent to email' });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ message: 'Server error sending reset code' });
  }
};


// Verify Code and Reset Password
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (!user.resetCode || !user.resetCodeExpiry) {
      return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
    }

    // Make sure both values are treated as strings for comparison
    if (user.resetCode.toString() !== code.toString()) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    // Check for expiry
    if (Date.now() > user.resetCodeExpiry) {
      return res.status(400).json({ message: 'Reset code expired' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    // Clear reset code and expiry
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.userId; // set via your authMiddleware

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getSubscriptionStatus = async (req, res) => {
  console.time('SubscriptionStatus API');

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  try {
    console.time('JWT Verification');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.timeEnd('JWT Verification');

    console.time('Mongo User Fetch');
    const user = await User.findById(decoded.userId);
    console.timeEnd('Mongo User Fetch');

    if (!user) return res.status(404).json({ message: 'User not found' });

    console.timeEnd('SubscriptionStatus API');

    res.json({
      subscriptionStatus: user.subscriptionStatus,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


// Unsubscribe User
exports.unsubscribeUser = async (req, res) => {
  const userId = req.userId;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if user has a subscriptionId stored
    if (!user.subscriptionId) {
      return res.status(400).json({ message: 'No active subscription found for this account.' });
    }

    // Retrieve subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);

    // If already scheduled for cancellation
    if (subscription.cancel_at_period_end) {
      return res.status(400).json({ message: 'Your subscription is already set to cancel at the period end.' });
    }

    // Set subscription to cancel at period end
    await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local database (if you're tracking subscription status)
    user.subscriptionStatus = 'active'; // remains active till period end
    user.subscriptionEndDate = new Date(subscription.current_period_end * 1000); // store end date
    await user.save();

    // Send success response
    res.json({
      message: `Your subscription will remain active until ${new Date(
        subscription.current_period_end * 1000
      ).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}. You will not be charged after that.`,
    });
  } catch (error) {
    console.error('Error in unsubscribeUser:', error);

    // If subscription not found on Stripe end
    if (error?.code === 'resource_missing') {
      return res.status(400).json({ message: 'Subscription not found on Stripe. Please contact support.' });
    }

    res.status(500).json({ message: 'An error occurred while processing your unsubscription request.' });
  }
};

exports.activateSubscriptionByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If already active
    if (user.subscriptionStatus === 'active') {
      return res.status(400).json({ message: 'Subscription is already active for this user.' });
    }

    // Update status to active
    user.subscriptionStatus = 'active';
    await user.save();

    res.json({ message: `Subscription activated for ${email}` });

  } catch (error) {
    console.error('Error in activateSubscriptionByEmail:', error);
    res.status(500).json({ message: 'An error occurred while activating the subscription.' });
  }
};




exports.updateUserProfile = async (req, res) => {
  const userId = req.userId;

  const { firstName, lastName, phoneNumber, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (address !== undefined) user.address = address;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    });

  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};

//GET user profile info
exports.getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID provided in token' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      subscriptionStatus: user.subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate || null,
    });

  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'An error occurred while fetching profile' });
  }
};


exports.generateReferralCode = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.subscriptionStatus !== 'active') {
      return res.status(400).json({ message: 'Only active subscribers can generate referral codes.' });
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    user.referralCode = code;
    user.referralCodeExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    res.json({ referralCode: code, expiry: user.referralCodeExpiry });

  } catch (error) {
    console.error('Error generating referral code:', error);
    res.status(500).json({ message: 'Could not generate referral code.' });
  }
};

