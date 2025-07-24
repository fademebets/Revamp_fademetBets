require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const handleStripeWebhook = require('./utils/stripeWebhookHandler');
const setupSocket = require('./socket'); // ✅ Import chat socket logic

// Import routes
const scrapeRoutes = require('./routes/scrapeRoutes');
const passwordForget = require('./routes/authForgetRoutes');
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
const chatRoutes = require('./routes/chatRoutes'); // ✅ Add chat routes

// Initialize app
const app = express();
const server = http.createServer(app); // ⬅️ Use http server
const io = new Server(server, {
  cors: {
    origin: [
      'https://fademebets.com',
      'https://www.fademebets.com',
      'https://revamp-fademetbets.vercel.app',
      'http://127.0.0.1:5500',
      'http://localhost:3000'
    ],
    credentials: true,
  },
});

// Connect to DB
connectDB();

// ✅ Stripe Webhook route (MUST come before express.json())
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Body parser
app.use(express.json());

// CORS
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
app.use('/api/chat', chatRoutes); // ✅ Mount chat routes

// ✅ Setup Socket.IO
setupSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
