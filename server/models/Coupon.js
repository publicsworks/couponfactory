const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ['available', 'soon'], default: 'available' },
    isPremiumOnly: { type: Boolean, default: false },
    imageUrl: { type: String } // Optional logo
});

module.exports = mongoose.model('Coupon', couponSchema);
