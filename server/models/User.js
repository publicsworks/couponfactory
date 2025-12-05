const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: String }, // Referral code of the person who referred this user
    validRefersCount: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    instagramUsername: { type: String },
    storyProofUrl: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    lastCouponUnlockDate: { type: Date },
    hasJoinedGiveaway: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
