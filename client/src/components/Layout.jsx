import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <main className="p-4">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
