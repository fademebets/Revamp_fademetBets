const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust this path to your actual User model

const fixUserSubscription = async () => {
  try {
    await mongoose.connect('mongodb+srv://fadeuser:securepassword@cluster0.csux8hi.mongodb.net/?retryWrites=true&w=majority&'); // Replace with your actual MongoDB URI

    const email = 'bekiddo15@gmail.com';

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User not found for email: ${email}`);
      return;
    }

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    user.subscriptionStatus = 'active';
    user.subscriptionPlan = 'yearly';
    user.subscriptionEndDate = oneYearFromNow;
    user.cancelAtPeriodEnd = false;

    await user.save();

    console.log(`✅ Subscription fixed for ${email}. Valid until ${oneYearFromNow.toISOString()}`);
  } catch (error) {
    console.error('❌ Error fixing subscription:', error);
  } finally {
    await mongoose.disconnect();
  }
};

fixUserSubscription();
