import React from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PremiumCard = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown size={100} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Crown className="text-yellow-400" size={20} />
                    <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Premium</span>
                </div>
                <h3 className="text-xl font-bold mb-1">Join Premium & Earn</h3>
                <p className="text-gray-300 text-sm mb-4">Get up to ₹5,000 Shopping Coupons</p>

                <div className="bg-gray-700/50 rounded-lg p-3 mb-4 backdrop-blur-sm">
                    <p className="text-xs text-gray-300 mb-1">Requirement</p>
                    <p className="font-semibold text-sm">Complete 10 Refers then Join</p>
                </div>

                <Link to="/refer" className="block w-full bg-white text-gray-900 text-center py-2.5 rounded-lg font-bold hover:bg-gray-100 transition">
                    Join Now
                </Link>
            </div>
        </div>
    );
};

export default PremiumCard;
