const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');
const resend = require('../config/resend');

// Forgot Password — User/Admin
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists in Admin
    let account = await Admin.findOne({ email });
    let type = 'Admin';

    if (!account) {
      // If not in Admin, check in User
      account = await User.findOne({ email });
      type = 'User';
    }

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Generate code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    account.resetCode = code;
    account.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await account.save();

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'FadeMeBets <no-reply@fademebets.com>',
      to: email,
      subject: `FadeMeBets Password Reset Code (${type})`,
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
    res.json({ message: `Reset code sent to ${type} email` });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Reset Password — User/Admin
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Check if email exists in Admin
    let account = await Admin.findOne({ email });
    let type = 'Admin';

    if (!account) {
      // If not in Admin, check in User
      account = await User.findOne({ email });
      type = 'User';
    }

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (!account.resetCode || !account.resetCodeExpiry) {
      return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
    }

    // Validate code
    if (account.resetCode.toString() !== code.toString()) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    if (Date.now() > account.resetCodeExpiry) {
      return res.status(400).json({ message: 'Reset code expired' });
    }

    // Hash password and save
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    account.password = hashedPassword;
    account.resetCode = undefined;
    account.resetCodeExpiry = undefined;

    await account.save();

    res.json({ message: `${type} password reset successful` });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
