require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const couponRoutes = require('./routes/couponRoutes');
const referralRoutes = require('./routes/referralRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
