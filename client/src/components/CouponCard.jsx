import React from 'react';
import { Lock, Clock } from 'lucide-react';

const CouponCard = ({ brand, status, logo }) => {
    const isAvailable = status === 'available';

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                    {logo || brand[0]}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{brand}</h3>
                    <p className={`text-xs ${isAvailable ? 'text-green-500' : 'text-orange-500'} flex items-center gap-1`}>
                        {isAvailable ? 'Available Now' : (
                            <>
                                <Clock size={12} /> Available Soon
                            </>
                        )}
                    </p>
                </div>
            </div>
            {!isAvailable && (
                <div className="bg-gray-100 p-2 rounded-full">
                    <Lock size={16} className="text-gray-400" />
                </div>
            )}
        </div>
    );
};

export default CouponCard;
