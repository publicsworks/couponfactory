import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { Trash2, Users, Award, Share2 } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, premiumUsers: 0, totalReferrals: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await api.get('/admin/stats');
            const usersRes = await api.get('/admin/users');
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(user => user._id !== id));
                fetchData(); // Refresh stats
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    if (loading) return <Layout><div className="text-center mt-10">Loading Admin Panel...</div></Layout>;

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <p className="text-xl font-bold">{stats.totalUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Premium Users</p>
                            <p className="text-xl font-bold">{stats.premiumUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full text-green-600">
                            <Share2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Referrals</p>
                            <p className="text-xl font-bold">{stats.totalReferrals}</p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Recent Users</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-3 font-medium">Name</th>
                                    <th className="p-3 font-medium">Email</th>
                                    <th className="p-3 font-medium">Role</th>
                                    <th className="p-3 font-medium">Premium</th>
                                    <th className="p-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-800">{user.name}</td>
                                        <td className="p-3 text-gray-600">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {user.isPremium ? (
                                                <span className="text-amber-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-400">No</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-right">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
