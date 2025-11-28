require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

const createAdmin = async () => {
    try {
        await connectDB();

        const email = 'professionalwork04@gmail.com';
        const password = 'work04@';
        const name = 'Admin';

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('User found. Updating to Admin...');
            // Update password and role
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.role = 'admin';
            await user.save();
            console.log('User updated to Admin successfully.');
        } else {
            console.log('User not found. Creating new Admin user...');
            // Create new admin user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name,
                email,
                password: hashedPassword,
                role: 'admin',
                referralCode: 'ADMIN01', // Static code for admin
                isPremium: true
            });
            await user.save();
            console.log('Admin user created successfully.');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
