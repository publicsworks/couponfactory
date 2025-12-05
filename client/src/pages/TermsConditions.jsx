import React from 'react';
import Layout from '../components/Layout';

const TermsConditions = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Terms & Conditions – CouponFactory</h1>

                <div className="text-[10px] leading-3 tracking-tighter text-gray-600 space-y-2 text-justify">
                    <p>Welcome to CouponFactory. By accessing or using our platform, you agree to the following Terms & Conditions. Please read them carefully.</p>

                    <h2 className="font-bold text-[11px] mt-2">1. General Use</h2>
                    <p>CouponFactory is a promotional platform that provides coupons, offers, giveaways, and premium rewards. We are not affiliated with any brands or stores, unless clearly mentioned. The website is for personal use only.</p>

                    <h2 className="font-bold text-[11px] mt-2">2. Coupon Policy (Upto ₹1000)</h2>
                    <p>“Upto ₹1000 Coupon” means the maximum value can be ₹1000. It does NOT guarantee that every user will receive ₹1000. Actual coupon value depends on availability, eligibility, ongoing campaigns, and random selection. Some users may receive a lower-value coupon or no coupon at all. Users cannot demand or claim a fixed coupon amount.</p>

                    <h2 className="font-bold text-[11px] mt-2">3. Premium Benefits (Upto ₹5000)</h2>
                    <p>Premium members may receive coupons worth up to ₹5000. This value is not guaranteed; final amounts may vary. Premium benefits may be updated, modified, or removed at any time based on availability. All premium purchases are non-refundable.</p>

                    <h2 className="font-bold text-[11px] mt-2">4. Giveaway Terms</h2>
                    <p>Giveaway will select 100 lucky winners through an automated random selection system. Winners may receive coupons worth up to ₹10,000, depending on availability. Not all participants are guaranteed to win. Some winners may receive smaller-value coupons, and some may receive no coupon, based on stock and brand rules. Users cannot dispute or challenge giveaway outcomes.</p>

                    <h2 className="font-bold text-[11px] mt-2">5. No Guarantee Clause</h2>
                    <p>CouponFactory does not guarantee: Coupon availability, Coupon redemption success, Fixed coupon value, Merchant acceptance of any coupon, That all users will receive offers or rewards. All offers may change, expire, or be withdrawn without prior notice. CouponFactory is not liable for: Expired coupons, Invalid coupons, Merchant rejection, Failed purchases, Financial loss of any kind.</p>

                    <h2 className="font-bold text-[11px] mt-2">6. User Responsibilities</h2>
                    <p>Users must: Provide accurate information, Avoid fraudulent actions, fake accounts, bots, scripts, or misuse. Any violation may result in account suspension or permanent ban.</p>

                    <h2 className="font-bold text-[11px] mt-2">7. Third-Party Merchant Disclaimer</h2>
                    <p>Many offers redirect to third-party merchant websites. CouponFactory is not responsible for: Payments, Orders, Delivery, Customer support, Return/refund issues, Merchant policies. All transactions are solely between the user and the merchant.</p>

                    <h2 className="font-bold text-[11px] mt-2">8. Limitation of Liability</h2>
                    <p>CouponFactory shall not be responsible for: Direct, indirect, incidental, or consequential losses, Coupon failures, Miscommunication between brands and users, Errors, delays, or service interruptions. Use of the platform is at the user's own risk.</p>

                    <h2 className="font-bold text-[11px] mt-2">9. Changes to Terms</h2>
                    <p>CouponFactory may update these Terms & Conditions at any time. Continued use of the website means you accept the updated terms.</p>

                    <h2 className="font-bold text-[11px] mt-2">10. Contact Information</h2>
                    <p>For support or inquiries, contact us at: 📩 support@couponfactory.shop</p>
                </div>
            </div>
        </Layout>
    );
};

export default TermsConditions;
