const User = require('../models/User');

const joinPremium = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.isPremium) {
            return res.status(400).json({ message: 'User is already premium' });
        }

        if (user.validRefersCount >= 10) {
            user.isPremium = true;
            await user.save();
            res.json({ message: 'Welcome to Premium!', isPremium: true });
        } else {
            res.status(400).json({ message: 'Not enough valid referrals to join premium' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { joinPremium };
