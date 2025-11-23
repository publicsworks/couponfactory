import React from 'react';
import { Home, Users, Ticket, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Refer', icon: Users, path: '/refer' },
        { name: 'Coupon', icon: Ticket, path: '/coupons' },
        { name: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 pb-5 z-50">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`flex flex-col items-center text-xs ${path === item.path ? 'text-primary font-semibold' : 'text-gray-500'
                        }`}
                >
                    <item.icon size={24} className="mb-1" />
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default BottomNav;
