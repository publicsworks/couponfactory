const express = require('express');
const router = express.Router();
const { unlockCoupon } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/unlock-coupon', protect, unlockCoupon);

module.exports = router;
