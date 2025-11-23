const express = require('express');
const router = express.Router();
const { joinPremium } = require('../controllers/premiumController');
const { protect } = require('../middleware/authMiddleware');

router.post('/join', protect, joinPremium);

module.exports = router;
