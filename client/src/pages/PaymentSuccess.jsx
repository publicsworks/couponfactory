import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { CheckCircle, XCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [status, setStatus] = useState('verifying');
    const { updateUser } = useContext(AuthContext);

    useEffect(() => {
        if (orderId) {
            verifyPayment(orderId);
        } else {
            setStatus('error');
        }
    }, [orderId]);

    const verifyPayment = async (id) => {
        try {
            const { data } = await api.post('/payment/verify', { orderId: id });
            if (data.success) {
                setStatus('success');
                // Refresh user data to update premium status
                updateUser();
            } else {
                setStatus('failed');
            }
        } catch (error) {
            console.error('Verification Error:', error);
            setStatus('failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                {status === 'verifying' && (
                    <div>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-gray-800">Verifying Payment...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we confirm your transaction.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Congratulations! You are now a Premium Member.</p>
                        <Link to="/" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                            Go to Home
                        </Link>
                    </div>
                )}

                {(status === 'failed' || status === 'error') && (
                    <div>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <XCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">We couldn't verify your payment. If money was deducted, it will be refunded automatically.</p>
                        <Link to="/" className="block w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition">
                            Go Back
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
