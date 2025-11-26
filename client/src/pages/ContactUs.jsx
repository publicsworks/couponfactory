import React from 'react';
import Layout from '../components/Layout';

const ContactUs = () => {
    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                    <p>
                        For support, queries, feedback or partnership requests, reach out to us at:
                    </p>
                    <p className="font-medium text-gray-800">
                        Email: <a href="mailto:support@couponfactory.shop" className="text-blue-600 hover:underline">support@couponfactory.shop</a>
                    </p>
                    <p>
                        We typically respond within 24 hours.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;
