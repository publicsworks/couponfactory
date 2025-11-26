import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                    <p>
                        At CouponFactory, we value your privacy and are committed to protecting your personal information. We only collect data necessary for account creation, order processing, communication, and improving user experience.
                    </p>
                    <p>
                        We never sell or share your personal information with external parties except trusted service providers and payment gateways.
                    </p>
                    <p>
                        All data is stored securely and handled with strict confidentiality.
                    </p>
                    <p className="font-medium text-gray-800">
                        For queries, email us at: <a href="mailto:support@couponfactory.shop" className="text-blue-600 hover:underline">support@couponfactory.shop</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
