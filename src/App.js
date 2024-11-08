import React from 'react';
import './App.css';
import Movies from './routes/TextHomepage.jsx';
import Post from './routes/Post';
import PricingPlans from './PricingPlans';  // Import PricingPlans component
import PaymentPage from './PaymentPage';    // Import PaymentPage component
import { Routes, Route } from 'react-router-dom';
import NavFooter from './NavFooter';
import Login from './Login';
import Signup from './Signup';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QGKjVLNo3nfW9gnL9Io82ryBORFqMGOSq9fJZKLxmiGhPTP5ls58cwJ3EP9Kp0STWB806F2QTlZ7bY5OA9cLqK000JoJUSHDx'); // Replace with your Stripe publishable key

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path='/' element={<NavFooter />}>
          <Route index element={<Movies />} />
          <Route path='post' element={<Post />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='plans' element={<PricingPlans />} />  {/* Add PricingPlans route */}
          <Route path='payment' element={<PaymentPage />} /> {/* Add PaymentPage route */}
        </Route>
      </Routes>
    </Elements>
  );
}

export default App;
