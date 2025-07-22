require('dotenv').config();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const handleStripeWebhook = require('./utils/stripeWebhookHandler');

// Import routes
const scrapeRoutes = require('./routes/scrapeRoutes');
const passwordForget = require('./routes/authForgetRoutes')
const adminRoutes = require('./routes/adminAuthRoutes');
const evRoutes = require('./routes/evRoutes');
const lockRoutes = require('./routes/lockRoutes');
const standingsRoutes = require("./routes/standingsRoutes");
const confirmSessionRoute = require('./routes/confirmsession');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const oddsRoutes = require("./routes/oddsRoutes");
const blogRoutes = require('./routes/blogRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const salesRoutes = require('./routes/salesRoutes');

// Initialize app
const app = express();

// Connect to DB
connectDB();

app.use(cors({
  origin: [
    'https://fademebets.com',
    'https://www.fademebets.com',
    'https://revamp-fademetbets.vercel.app',
    'http://127.0.0.1:5500',
    'http://localhost:3000'
  ],
  credentials: true,
}));

// ✅ Stripe Webhook route (MUST come before express.json())
// ✅ Stripe Webhook route — must come BEFORE express.json()
// ✅ Correct webhook route setup
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);




// Body parser middleware
app.use(express.json());

// API routes
app.use('/api/stripe', confirmSessionRoute);
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ev', evRoutes);
app.use('/api/locks', lockRoutes);
app.use('/api', scrapeRoutes);
app.use('/api', standingsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api', loginRoutes);
app.use('/api', adminUserRoutes);
app.use('/api', salesRoutes);
app.use("/api/odds", oddsRoutes);
app.use("/api", passwordForget);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
