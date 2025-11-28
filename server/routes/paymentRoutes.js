const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, unlockCoupon, createCouponOrder, verifyCouponPayment, checkCouponStatus } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.post('/unlock-coupon', protect, unlockCoupon);

// Coupon Unlock Routes
router.post('/create-coupon-order', protect, createCouponOrder);
router.post('/verify-coupon', protect, verifyCouponPayment);
router.get('/coupon-status', protect, checkCouponStatus);

module.exports = router;
