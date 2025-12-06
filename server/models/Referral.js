const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'valid'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

referralSchema.index({ referrer: 1 });
referralSchema.index({ referredUser: 1 });

module.exports = mongoose.model('Referral', referralSchema);
