// src/PricingPlans.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PricingPlans.css';

function PricingPlans() {
  return (
    <div className="pricing-container">
      <h2>Choose Your Plan</h2>
      <div className="plans-wrapper">
        <div className="plan-card">
          <h3>Free Plan</h3>
          <div className="price">$0/month</div>
          <ul>
            Basic posting features
          </ul>
          <ul>Limited article access</ul>
          <ul>Standard support</ul>
          <button className="plan-button">Current Plan</button>
        </div>

        <div className="plan-card premium">
          <h3>Premium Plan</h3>
          <div className="price">$9.99/month</div>
          <ul>
            Unlimited posts
          </ul>
          <ul>Custom themes</ul>
          <ul>Priority support</ul>

          <Link to="/payment">
            <button className="plan-button premium-button">Upgrade Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingPlans;