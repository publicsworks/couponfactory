import React from 'react';
import Layout from '../components/Layout';

const ShippingPolicy = () => {
    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Shipping Policy</h1>
                <div className="text-gray-600 space-y-4 leading-relaxed">
                    <p>
                        CouponFactory deals exclusively in digital coupon codes and offers.
                    </p>
                    <p>
                        No physical shipping is involved.
                    </p>
                    <p>
                        Your purchased coupon or offer is delivered instantly to your registered email or account dashboard.
                    </p>
                    <p className="font-medium text-gray-800">
                        If you face any issue or delay, contact: <a href="mailto:support@couponfactory.shop" className="text-blue-600 hover:underline">support@couponfactory.shop</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ShippingPolicy;
