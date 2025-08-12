// src/components/Hero.js

import React from 'react';
import './Hero.css'; // optional for styling


const Hero = () => {
  return (
    <section className="hero">
      <nav className="navbar">
        <div className="logo">
          <img src="./logo.png" alt="Mentor Connect" />
          <h1>ZAVIA</h1>
        </div>
        <ul className="nav-links">
          <li>About</li>
          <li>How It Works</li>
          <li>Mentors</li>
          <li>Pricing</li>
          <li>Support</li>
        </ul>
        <div className="auth-buttons">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </nav>

      <div className="hero-content">
        <h1>Connect with Mentors Who Get You</h1>
        <p>
          Personalized mentorship for students and young professionals based on
          your goals, skills, and interests.
        </p>
        <button className="btn-primary">Get Started for Free</button>
      </div>
    </section>
  );
};

export default Hero;
