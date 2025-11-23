import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Crown, User, Instagram, Upload } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [instaUser, setInstaUser] = useState(user?.instagramUsername || '');

    const handleSaveInsta = () => {
        // Call API to update user
        alert('Instagram username updated (simulated)');
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <User size={40} className="text-gray-500" />
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>

                {user?.isPremium ? (
                    <div className="mt-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Crown size={14} /> Premium Member
                    </div>
                ) : (
                    <div className="mt-3 bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-xs font-bold">
                        Free Member
                    </div>
                )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="font-bold text-sm mb-3">Account Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Referral Code</label>
                        <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm font-mono">
                            {user?.referralCode}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Instagram Username</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Instagram size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={instaUser}
                                    onChange={(e) => setInstaUser(e.target.value)}
                                    className="w-full pl-9 p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="@username"
                                />
                            </div>
                            <button onClick={handleSaveInsta} className="bg-primary text-white px-3 rounded text-xs font-bold">
                                Save
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Story Proof</label>
                        <button className="w-full border-2 border-dashed border-gray-300 p-4 rounded-lg text-gray-500 flex flex-col items-center gap-2 hover:bg-gray-50 transition">
                            <Upload size={20} />
                            <span className="text-xs">Upload Screenshot</span>
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={logout}
                className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition"
            >
                <LogOut size={18} /> Logout
            </button>
        </Layout>
    );
};

export default Profile;
