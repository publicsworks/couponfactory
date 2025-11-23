const express = require('express');
const router = express.Router();
const { getCoupons } = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCoupons);

module.exports = router;
