import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="font-bold text-xl text-primary">CouponFactory</div>
            <Link to="/profile" className="p-2 bg-gray-100 rounded-full">
                <User size={20} className="text-gray-600" />
            </Link>
        </div>
    );
};

export default Navbar;
