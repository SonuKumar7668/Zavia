// src/components/Pricing.js

import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section className="pricing-section">
      <h2>Simple, Transparent Pricing</h2>
      <p>Mentorship shouldn't be expensive. Get started for free, then choose what suits you.</p>
      <div className="pricing-cards">
        <div className="plan">
          <h3>Starter</h3>
          <p>₹0 / month</p>
          <ul>
            <li>2 mentor sessions/month</li>
            <li>Goal tracker</li>
            <li>Access to forums</li>
          </ul>
        </div>
        <div className="plan featured">
          <h3>Pro</h3>
          <p>₹499 / month</p>
          <ul>
            <li>Unlimited sessions</li>
            <li>Session feedback & resources</li>
            <li>Community circles access</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
