import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
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

    const [couponStatus, setCouponStatus] = useState({ canUnlock: true, remainingTime: 0 });
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const { data } = await api.get('/payment/coupon-status');
                setCouponStatus(data);
            } catch (error) {
                console.error('Error fetching coupon status');
            }
        };
        if (user) checkStatus();

        // Check for payment return
        const orderId = searchParams.get('coupon_order_id');
        if (orderId) {
            verifyCouponPayment(orderId);
        }
    }, [user, searchParams]);

    const verifyCouponPayment = async (orderId) => {
        try {
            setUnlocking(true);
            const { data } = await api.post('/payment/verify-coupon', { orderId });
            if (data.success) {
                alert('Payment Successful! Coupon Unlocked.');
                window.location.href = '/'; // Reload to reset params and state
            } else {
                alert('Payment Failed.');
            }
        } catch (error) {
            console.error('Verification failed', error);
        } finally {
            setUnlocking(false);
        }
    };

    const handleUnlock = async () => {
        setUnlocking(true);
        try {
            const cashfree = await window.Cashfree({ mode: "production" });
            const { data } = await api.post('/payment/create-coupon-order', {
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
            console.error('Payment Init Error', error);
            alert('Failed to start payment');
            setUnlocking(false);
        }
    };

    // Timer Component
    const Countdown = ({ ms }) => {
        const [timeLeft, setTimeLeft] = useState(ms);

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(prev => Math.max(0, prev - 1000));
            }, 1000);
            return () => clearInterval(timer);
        }, []);

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return <span className="text-xs font-mono">{hours}h {minutes}m {seconds}s</span>;
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

                    {couponStatus.canUnlock ? (
                        <button
                            onClick={handleUnlock}
                            disabled={unlocking}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                        >
                            {unlocking ? 'Processing...' : 'Unlock Now (₹10)'}
                        </button>
                    ) : (
                        <button
                            disabled
                            className="w-full bg-gray-200 text-gray-500 text-xs py-2 rounded-lg font-semibold cursor-not-allowed flex flex-col items-center"
                        >
                            <span>Available Soon</span>
                            <Countdown ms={couponStatus.remainingTime} />
                        </button>
                    )}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2 text-pink-600">
                        <Instagram size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">Story Post</h3>
                    <a
                        href="/story-post.png"
                        download="coupon-factory-story.png"
                        className="w-full bg-gray-100 text-gray-700 text-xs py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1"
                    >
                        Download <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            <a href="https://www.instagram.com/coupon_factory1?igsh=ZTJ2eHB0YzZzNHYx" target="_blank" rel="noopener noreferrer" className="block bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between hover:bg-gray-50">
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
