import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/coupon.jpg';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const referredBy = searchParams.get('ref') || '';
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            setError('You must agree to the Terms and Conditions');
            return;
        }
        try {
            await register(name, email, password, referredBy);
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || err.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="CouponFactory Logo" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Join CouponFactory</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {referredBy && (
                        <div className="mb-4 text-sm text-green-600">
                            Referred by code: {referredBy}
                        </div>
                    )}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div >
        </div >
    );
};

export default Register;
