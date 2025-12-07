import React from 'react';
import { X, CreditCard, Download, Instagram, UserCheck } from 'lucide-react';

const RedeemInstructionsPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-purple-600 p-4 flex justify-between items-center">
                    <h2 className="text-white font-bold text-lg">How to Redeem Up to ₹1000</h2>
                    <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Step 1: Unlock Coupon</h3>
                            <p className="text-xs text-gray-600">Pay <span className="font-bold">₹50</span> to unlock your exclusive shopping coupon.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                            <Download size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Step 2: Share Story</h3>
                            <p className="text-xs text-gray-600">Download the "Story Post" image and upload it to your Instagram Story.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-full text-purple-600 mt-1">
                            <UserCheck size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Step 3: Verify & Redeem</h3>
                            <p className="text-xs text-gray-600">Go to your Profile, upload a screenshot of your story to verify and redeem your reward!</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-md"
                    >
                        Got it, Let's Start! 🚀
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RedeemInstructionsPopup;
