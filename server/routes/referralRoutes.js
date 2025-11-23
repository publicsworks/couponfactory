const express = require('express');
const router = express.Router();
const { getReferralStats, getReferralList } = require('../controllers/referralController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getReferralStats);
router.get('/list', protect, getReferralList);

module.exports = router;
