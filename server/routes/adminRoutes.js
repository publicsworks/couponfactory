const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/stats', protect, adminMiddleware, getStats);
router.get('/users', protect, adminMiddleware, getAllUsers);
router.delete('/users/:id', protect, adminMiddleware, deleteUser);

module.exports = router;
