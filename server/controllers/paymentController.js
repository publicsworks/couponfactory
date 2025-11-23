const User = require('../models/User');
const Referral = require('../models/Referral');

const unlockCoupon = async (req, res) => {
    // Simulate payment success
    const { couponId } = req.body;
    const userId = req.user._id;

    try {
        // Check if this user was referred by someone
        const user = await User.findById(userId);

        if (user.referredBy) {
            const referrer = await User.findOne({ referralCode: user.referredBy });

            if (referrer) {
                // Check if referral is already valid
                const referralRecord = await Referral.findOne({
                    referrer: referrer._id,
                    referredUser: userId
                });

                if (referralRecord && referralRecord.status === 'pending') {
                    referralRecord.status = 'valid';
                    await referralRecord.save();

                    referrer.validRefersCount += 1;
                    await referrer.save();
                }
            }
        }

        res.json({ message: 'Coupon unlocked successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { unlockCoupon };
