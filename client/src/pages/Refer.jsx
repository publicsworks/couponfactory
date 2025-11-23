import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import { Copy, Users, CheckCircle, Clock } from 'lucide-react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Refer = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalRefers: 0, validRefers: 0, remainingForPremium: 10 });
    const [referrals, setReferrals] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/referral/stats');
                setStats(statsRes.data);
                const listRes = await api.get('/referral/list');
                setReferrals(listRes.data);
            } catch (error) {
                console.log('API error', error);
            }
        };
        fetchData();
    }, []);

    const referralLink = `http://localhost:5173/register?ref=${user?.referralCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Layout>
            <h2 className="text-xl font-bold mb-4">Refer & Earn</h2>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <p className="text-sm text-gray-500 mb-2">Your Referral Link</p>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="bg-transparent flex-1 text-sm text-gray-700 focus:outline-none"
                    />
                    <button onClick={copyToClipboard} className="text-primary">
                        {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.totalRefers}</p>
                    <p className="text-xs text-gray-600">Total Refers</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.validRefers}</p>
                    <p className="text-xs text-gray-600">Valid Refers</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-bold text-orange-600">{stats.remainingForPremium}</p>
                    <p className="text-xs text-gray-600">Remaining</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Referral Rules</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Share your link with friends.</li>
                    <li>They must register and unlock a coupon.</li>
                    <li>Once they unlock, it counts as a Valid Refer.</li>
                    <li>Complete 10 Valid Refers to join Premium.</li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-3">Your Referrals</h3>
                {referrals.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No referrals yet.</p>
                ) : (
                    <div className="space-y-3">
                        {referrals.map((ref) => (
                            <div key={ref._id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sm">{ref.referredUser?.name || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500">{new Date(ref.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${ref.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {ref.status === 'valid' ? 'Valid' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Refer;
