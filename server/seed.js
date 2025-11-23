require('dotenv').config();
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
const connectDB = require('./config/db');

const seedData = async () => {
    await connectDB();

    await Coupon.deleteMany({});

    const coupons = [
        {
            brand: 'Free Coupon',
            title: 'Get ₹10 Cashback',
            code: 'FREE10',
            status: 'available',
            isPremiumOnly: false
        },
        {
            brand: 'Flipkart',
            title: '10% Off on Electronics',
            code: 'FLIP10',
            status: 'soon',
            isPremiumOnly: false
        },
        {
            brand: 'Amazon',
            title: '₹500 Gift Voucher',
            code: 'AMZ500',
            status: 'soon',
            isPremiumOnly: false
        },
        {
            brand: 'Myntra',
            title: 'Buy 1 Get 1 Free',
            code: 'MYN11',
            status: 'soon',
            isPremiumOnly: false
        },
        {
            brand: 'Ajio',
            title: 'Flat 50% Off',
            code: 'AJIO50',
            status: 'soon',
            isPremiumOnly: false
        },
        {
            brand: 'Domino’s',
            title: 'Free Garlic Bread',
            code: 'DOMGB',
            status: 'soon',
            isPremiumOnly: false
        }
    ];

    await Coupon.insertMany(coupons);
    console.log('Data Seeded');
    process.exit();
};

seedData();
