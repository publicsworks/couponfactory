import React from 'react';
import Layout from '../components/Layout';

const RefundPolicy = () => {
    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Cancellation & Refund Policy</h1>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                    <p>
                        Our products are digital coupons, therefore once delivered, they cannot be canceled or refunded.
                    </p>
                    <p>
                        If a coupon is invalid or non-working, contact us within 24 hours of purchase.
                    </p>
                    <p>
                        After verification, we will provide a replacement if eligible.
                    </p>
                    <p className="font-medium text-gray-800">
                        Support email: <a href="mailto:support@couponfactory.shop" className="text-blue-600 hover:underline">support@couponfactory.shop</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default RefundPolicy;
