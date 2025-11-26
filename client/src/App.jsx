import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Refer from './pages/Refer';
import Coupons from './pages/Coupons';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/refer" element={
        <ProtectedRoute>
          <Refer />
        </ProtectedRoute>
      } />
      <Route path="/coupons" element={
        <ProtectedRoute>
          <Coupons />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Public Policy Pages */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/shipping" element={<ShippingPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
