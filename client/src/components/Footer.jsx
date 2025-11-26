import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 mt-10">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Brand & Tagline */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">CouponFactory</h2>
                    <p className="text-gray-400 text-sm">
                        Best deals, coupons & offers delivered instantly.
                    </p>
                </div>

                {/* Important Links */}
                <div className="mb-8">
                    <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wider">Important Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
                        </li>
                        <li>
                            <Link to="/refund-policy" className="hover:text-white transition-colors">Cancellation & Refund Policy</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="mb-8">
                    <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
                    <p className="text-sm text-gray-400">
                        Email: <a href="mailto:support@couponfactory.shop" className="hover:text-white transition-colors">support@couponfactory.shop</a>
                    </p>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-6">
                    <p className="text-xs text-gray-500">
                        © 2025 CouponFactory — All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
