import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import CouponCard from '../components/CouponCard';
import PremiumCard from '../components/PremiumCard';
import { Lock, Instagram, ExternalLink, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [coupons, setCoupons] = useState([]);
    const { user, updateUser } = useContext(AuthContext);
    const [unlocking, setUnlocking] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                // In a real app, we fetch from API. For now, we can mock or use the seed data if API is running.
                // Let's try to fetch, if fails, use mock.
                const { data } = await api.get('/coupons');
                setCoupons(data);
            } catch (error) {
                console.log('API not reachable, using mock data');
                setCoupons([
                    { _id: '1', brand: 'Flipkart', status: 'soon' },
                    { _id: '2', brand: 'Amazon', status: 'soon' },
                    { _id: '3', brand: 'Myntra', status: 'soon' },
                    { _id: '4', brand: 'Ajio', status: 'soon' },
                    { _id: '5', brand: 'Domino’s', status: 'soon' },
                ]);
            }
        };
        fetchCoupons();
    }, []);

    const handleUnlock = async () => {
        setUnlocking(true);
        try {
            await api.post('/payment/unlock-coupon', { couponId: 'FREE10' });
            alert('Coupon Unlocked! ₹10 Cashback credited (Simulated).');
            // Refresh user data if needed
        } catch (error) {
            console.error(error);
            alert('Unlock failed or simulated payment error.');
        } finally {
            setUnlocking(false);
        }
    };

    return (
        <Layout>
            {/* Section 1: Free Coupon & Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 text-green-600">
                        <CheckCircle size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">Free Coupon</h3>
                    <button
                        onClick={handleUnlock}
                        disabled={unlocking}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                    >
                        {unlocking ? 'Processing...' : 'Unlock Now'}
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2 text-pink-600">
                        <Instagram size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">Story Post</h3>
                    <button className="w-full bg-gray-100 text-gray-700 text-xs py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1">
                        Link <ExternalLink size={12} />
                    </button>
                </div>
            </div>

            <a href="#" className="block bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5 rounded-full">
                        <div className="bg-white p-1 rounded-full">
                            <Instagram size={16} className="text-gray-700" />
                        </div>
                    </div>
                    <span className="font-medium text-sm">Follow Instagram Page</span>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
            </a>

            <section className="mt-4 mb-8 rounded-2xl bg-white shadow-md px-4 py-4">
                <h2 className="text-sm font-semibold text-slate-800 mb-3">Brand Coupons</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logos/flipkart.png" className="w-32 h-32 rounded-lg object-contain border border-gray-100 p-1" />
                        </div>
                        <button
                            onClick={() => alert('Available Soon')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors text-base"
                        >
                            GET DEAL
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logos/amazon.png" className="w-32 h-32 rounded-lg object-contain border border-gray-100 p-1" />
                        </div>
                        <button
                            onClick={() => alert('Available Soon')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors text-base"
                        >
                            GET DEAL
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logos/myntra.png" className="w-32 h-32 rounded-lg object-contain border border-gray-100 p-1" />
                        </div>
                        <button
                            onClick={() => alert('Available Soon')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors text-base"
                        >
                            GET DEAL
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logos/ajio.png" className="w-32 h-32 rounded-lg object-contain border border-gray-100 p-1" />
                        </div>
                        <button
                            onClick={() => alert('Available Soon')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors text-base"
                        >
                            GET DEAL
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logos/dominos.png" className="w-32 h-32 rounded-lg object-contain border border-gray-100 p-1" />
                        </div>
                        <button
                            onClick={() => alert('Available Soon')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors text-base"
                        >
                            GET DEAL
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 3: Premium Card */}
            <PremiumCard />

        </Layout>
    );
};

export default Home;
