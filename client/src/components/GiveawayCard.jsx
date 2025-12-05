import React, { useState, useContext } from 'react';
import { Gift, Camera, Smartphone, Laptop, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const GiveawayCard = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        setLoading(true);
        try {
            const cashfree = await window.Cashfree({ mode: "production" });
            const { data } = await api.post('/payment/create-giveaway-order', {
                amount: 10,
                customerId: user._id,
                customerEmail: user.email,
                customerPhone: user.phone || '9999999999'
            });

            if (data.payment_session_id) {
                cashfree.checkout({
                    paymentSessionId: data.payment_session_id,
                    redirectTarget: "_self"
                });
            }
        } catch (error) {
            console.error('Giveaway Payment Error', error);
            alert('Failed to start payment');
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-400 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={10} /> Exclusive Event
                    </span>
                </div>

                <h2 className="text-2xl font-bold mb-1">Mega Giveaway</h2>
                <p className="text-indigo-200 text-xs mb-4">Join now for a chance to win premium rewards!</p>

                <div className="grid grid-cols-4 gap-2 mb-6">
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                        <Camera size={20} className="text-yellow-300 mb-1" />
                        <span className="text-[9px] text-gray-200">Camera</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                        <Laptop size={20} className="text-blue-300 mb-1" />
                        <span className="text-[9px] text-gray-200">Laptop</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                        <Smartphone size={20} className="text-green-300 mb-1" />
                        <span className="text-[9px] text-gray-200">Phone</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                        <ShoppingBag size={20} className="text-pink-300 mb-1" />
                        <span className="text-[9px] text-gray-200">Makeup</span>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                    <div>
                        <p className="text-xs text-indigo-200">Entry Fee</p>
                        <p className="text-xl font-bold text-white">₹10 <span className="text-[10px] font-normal text-indigo-300">/ entry</span></p>
                    </div>
                    <button 
                        onClick={handleJoin}
                        disabled={loading || user?.hasJoinedGiveaway}
                        className={`font-bold py-2 px-4 rounded-lg text-sm shadow-lg hover:shadow-xl transition flex items-center gap-1 ${
                            user?.hasJoinedGiveaway 
                            ? 'bg-green-500 text-white cursor-default' 
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900'
                        }`}
                    >
                        {user?.hasJoinedGiveaway ? (
                            <span>Winners Announced on 1 Jan 🏆</span>
                        ) : (
                            <>
                                {loading ? 'Processing...' : 'JOIN NOW'} <ArrowRight size={14} />
                            </>
                        )}
                    </button>
                </div>
                
                <p className="text-[9px] text-indigo-300 mt-3 text-center opacity-70">
                    *Winners selected randomly. T&C Apply.
                </p>
            </div>
        </div>
    );
};

export default GiveawayCard;
