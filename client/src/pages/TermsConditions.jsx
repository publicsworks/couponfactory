import React from 'react';
import Layout from '../components/Layout';

const TermsConditions = () => {
    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                    <p>
                        By using CouponFactory, you agree to follow all rules and policies of our platform.
                    </p>
                    <p>
                        All coupons and offers on our website are subject to availability and may change without prior notice.
                    </p>
                    <p>
                        Users must provide accurate information during account creation or purchase.
                    </p>
                    <p>
                        Fraudulent activity, misuse, or unauthorized actions may result in account suspension.
                    </p>
                    <p className="font-medium text-gray-800">
                        For support, contact: <a href="mailto:support@couponfactory.shop" className="text-blue-600 hover:underline">support@couponfactory.shop</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default TermsConditions;
