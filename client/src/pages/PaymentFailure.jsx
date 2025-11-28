import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <XCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                <p className="text-gray-600 mb-6">The transaction was cancelled or failed. Please try again.</p>
                <Link to="/" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default PaymentFailure;
