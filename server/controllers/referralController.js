const User = require('../models/User');
const Referral = require('../models/Referral');

const getReferralStats = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const totalRefers = await Referral.countDocuments({ referrer: req.user._id });
        const validRefers = user.validRefersCount;

        res.json({
            totalRefers,
            validRefers,
            remainingForPremium: Math.max(0, 10 - validRefers)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReferralList = async (req, res) => {
    try {
        const referrals = await Referral.find({ referrer: req.user._id })
            .populate('referredUser', 'name email status')
            .sort({ createdAt: -1 });

        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReferralStats, getReferralList };
