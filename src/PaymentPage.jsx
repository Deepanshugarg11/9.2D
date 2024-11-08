// src/PaymentPage.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';

function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      // Here you would typically send the paymentMethod.id to your server
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Complete Your Premium Subscription</h2>
        <div className="payment-details">
          <h3>Premium Plan</h3>
          <p>$50/month</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-element-container">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {succeeded && (
            <div className="success-message">
              Your subscription is now active.
            </div>
          )}
          <button 
            type="submit" 
            disabled={!stripe || processing || succeeded}
            className="payment-button"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
