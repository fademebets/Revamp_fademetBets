const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');
const User = require('../models/User');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY); // store your Resend API key in .env

// Register Admin
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await Admin.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.notifyLockUpdate = async (req, res) => {
  try {
    console.log('Fetching active subscribers...');
    const activeUsers = await User.find(
        { subscriptionStatus: 'active' },
        { email: 1 }
      );

    console.log('Active users found:', activeUsers.length);

    if (activeUsers.length === 0) {
      return res.status(404).json({ message: 'No active subscribers found.' });
    }

    // Sleep helper
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const user of activeUsers) {
      if (!user.email || !user.email.includes('@')) {
        console.warn(`Invalid email skipped: ${user.email}`);
        continue;
      }

      try {
        const response = await resend.emails.send({
          from: 'FadeMeBets <team@fademebets.com>',
          to: user.email,
          subject: '🚨 Lock of the Day Updated!',
          html: `
            <div style="max-width: 600px; margin: auto; border: 1px solid #eee; padding: 24px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://www.fademebets.com/logo.png" alt="FadeMeBets" style="max-width: 160px;" />
              </div>
              <h2 style="color: #333; font-size: 22px;">Hey Subscriber,</h2>
              <p style="font-size: 16px; color: #444; line-height: 1.6;">
                We’re excited to tell you that today’s 🔒 of the day has just been updated on <strong>FadeMeBets</strong>.
                Head on over to our site to view our highest-confidence pick, backed by expert analysis and real-time data!
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://fademebets.com/" style="background-color: #c8102e; color: #fff; padding: 14px 26px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
                  View Lock of the Day
                </a>
              </div>
              <p style="font-size: 14px; color: #666;">
                Stay sharp,<br/>
                <strong>FadeMeBets Team</strong>
              </p>
              <p style="font-size: 13px; color: #999; font-style: italic; text-align: center; margin-top: 20px;">
                Born to Fade
              </p>
            </div>
          `,
        });

        console.log(`✅ Email sent to: ${user.email}`);

        // Wait 5 seconds before sending next email
        await sleep(10000);

      } catch (emailError) {
        console.error(`❌ Failed sending email to ${user.email}:`, emailError);
      }
    }

    res.status(200).json({ message: 'Notifications sent to active subscribers.' });

  } catch (error) {
    console.error('❌ Full error sending notifications:', error);
    res.status(500).json({ message: 'Server error sending notifications.' });
  }
};


exports.changePasswordWithToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    const { oldPassword, newPassword } = req.body;

    // Validate inputs
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both old and new passwords are required.' });
    }

    // Compare old password
    console.time('compareOld');
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    console.timeEnd('compareOld');

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect.' });
    }

    // Check if new password is same as old
    console.time('compareNew');
    const isSame = await bcrypt.compare(newPassword, admin.password);
    console.timeEnd('compareNew');

    if (isSame) {
      return res.status(400).json({ success: false, message: 'New password must be different from old password.' });
    }

    // Hash new password
    console.time('hashNew');
    admin.password = await bcrypt.hash(newPassword, 10);  // 10 rounds for faster dev; use 12 in production
    console.timeEnd('hashNew');

    await admin.save();

    res.status(200).json({ success: true, message: 'Password updated successfully.' });

  } catch (error) {
    console.error('Change password error:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
    res.status(500).json({ success: false, message: 'Server error while changing password.' });
  }
};
