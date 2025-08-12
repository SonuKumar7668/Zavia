// src/components/WhyTrust.js

import React from 'react';
import './WhyTrust.css';

const WhyTrust = () => {
  return (
    <section className="trust-section">
      <h2>Why ZAVIA?</h2>
      <div className="trust-items">
        <div className="trust-card">
          <h3>Personalized Guidance</h3>
          <p>We match mentees with mentors based on skills, goals, and industries.</p>
        </div>
        <div className="trust-card">
          <h3>No Spam, No Gimmicks</h3>
          <p>No noisy notifications—just meaningful, scheduled mentorship connections.</p>
        </div>
        {/* <div className="trust-card">
          <h3>Real Mentorship Outcomes</h3>
          <p>Track your growth with milestones, feedback, and career progression metrics.</p>
        </div> */}
        <div className="trust-card">
          <h3>Community of Experts</h3>
          <p>Join a network of vetted mentors from top industries and educational backgrounds.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyTrust;
