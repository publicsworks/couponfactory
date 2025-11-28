const { Cashfree } = require('cashfree-pg');
const User = require('../models/User');
const crypto = require('crypto');

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_ENV === 'PRODUCTION'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

// @desc    Create Payment Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orderId = `ORDER_${userId}_${Date.now()}`;
        const amount = 199; // Premium Membership Cost

        const request = {
            order_amount: amount,
            order_currency: 'INR',
            order_id: orderId,
            customer_details: {
                customer_id: userId.toString(),
                customer_phone: '9999999999', // You might want to collect this from user
                customer_name: user.name,
                customer_email: user.email
            },
            order_meta: {
                return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?order_id={order_id}`,
                notify_url: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/payment/webhook`
            }
        };

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        res.json(response.data);

    } catch (error) {
        console.error('Error creating order:', error.response?.data?.message || error.message);
        res.status(500).json({ message: 'Payment initiation failed', error: error.message });
    }
};

// @desc    Verify Payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);

        // Check if any transaction is successful
        const validTransaction = response.data.find(txn => txn.payment_status === 'SUCCESS');

        if (validTransaction) {
            // Update user to premium
            const user = await User.findById(req.user._id);
            if (user) {
                user.isPremium = true;
                await user.save();
                res.json({ success: true, message: 'Payment verified, Premium activated!' });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Payment not successful' });
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};

// @desc    Unlock Free Coupon (Simulated or Real)
// @route   POST /api/payment/unlock-coupon
// @access  Private
const unlockCoupon = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Logic to mark referral as valid if this is the first unlock
        const Referral = require('../models/Referral');
        const referral = await Referral.findOne({ referredUser: user._id });

        if (referral && referral.status === 'pending') {
            referral.status = 'valid';
            await referral.save();

            // Increment valid refer count for referrer
            await User.findByIdAndUpdate(referral.referrer, { $inc: { validRefersCount: 1 } });
        }

        res.json({ success: true, message: 'Coupon Unlocked' });
    } catch (error) {
        console.error('Unlock Error:', error);
        res.status(500).json({ message: 'Unlock failed' });
    }
};

unlockCoupon,
    createCouponOrder,
    verifyCouponPayment,
    checkCouponStatus
};

// @desc    Create Order for ₹10 Coupon Unlock
// @route   POST /api/payment/create-coupon-order
// @access  Private
const createCouponOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const orderId = `COUPON_${userId}_${Date.now()}`;
        const amount = 10; // Coupon Unlock Cost

        const request = {
            order_amount: amount,
            order_currency: 'INR',
            order_id: orderId,
            customer_details: {
                customer_id: userId.toString(),
                customer_phone: '9999999999',
                customer_name: user.name,
                customer_email: user.email
            },
            order_meta: {
                return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?coupon_order_id={order_id}`,
            }
        };

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        res.json(response.data);

    } catch (error) {
        console.error('Error creating coupon order:', error);
        res.status(500).json({ message: 'Payment initiation failed' });
    }
};

// @desc    Verify Coupon Payment & Set Cooldown
// @route   POST /api/payment/verify-coupon
// @access  Private
const verifyCouponPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        const validTransaction = response.data.find(txn => txn.payment_status === 'SUCCESS');

        if (validTransaction) {
            const user = await User.findById(req.user._id);

            // Update last unlock date to NOW
            user.lastCouponUnlockDate = new Date();

            // Also mark as valid referral if first time (reusing logic)
            const Referral = require('../models/Referral');
            const referral = await Referral.findOne({ referredUser: user._id });
            if (referral && referral.status === 'pending') {
                referral.status = 'valid';
                await referral.save();
                await User.findByIdAndUpdate(referral.referrer, { $inc: { validRefersCount: 1 } });
            }

            await user.save();
            res.json({ success: true, message: 'Coupon Unlocked' });
        } else {
            res.status(400).json({ success: false, message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error verifying coupon payment:', error);
        res.status(500).json({ message: 'Verification failed' });
    }
};

// @desc    Check Coupon Status (Cooldown)
// @route   GET /api/payment/coupon-status
// @access  Private
const checkCouponStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user.lastCouponUnlockDate) {
            return res.json({ canUnlock: true });
        }

        const lastUnlock = new Date(user.lastCouponUnlockDate).getTime();
        const now = Date.now();
        const cooldown = 72 * 60 * 60 * 1000; // 72 hours in ms

        if (now - lastUnlock < cooldown) {
            const remainingTime = cooldown - (now - lastUnlock);
            return res.json({ canUnlock: false, remainingTime });
        }

        res.json({ canUnlock: true });
    } catch (error) {
        res.status(500).json({ message: 'Error checking status' });
    }
};
