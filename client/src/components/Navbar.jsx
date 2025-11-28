import React, { useContext } from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="font-bold text-xl text-primary">CouponFactory</Link>
            <div className="flex items-center gap-3">
                {user && user.role === 'admin' && (
                    <Link to="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        Admin Panel
                    </Link>
                )}
                <Link to="/profile" className="p-2 bg-gray-100 rounded-full">
                    <User size={20} className="text-gray-600" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
