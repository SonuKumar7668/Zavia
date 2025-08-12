// src/components/Features.js

import React from 'react';
import './Features.css';

const features = [
  { title: 'Skill-Based Matchmaking', desc: 'AI-driven matching ensures mentor-mentee compatibility.' },
  { title: '1:1 Live Sessions', desc: 'Video and chat tools for focused mentorship conversations.' },
  // { title: 'Goal Tracker', desc: 'Define and track career or academic goals with mentor support.' },
  { title: 'Feedback System', desc: 'Exchange constructive feedback after every session.' },
  // { title: 'Learning Resources', desc: 'Mentors share curated materials and reading lists.' },
  // { title: 'Community Circles', desc: 'Group sessions for peer learning and networking.' },
];

const Features = () => {
  return (
    <section className="features-section">
      <h2>What You Get </h2>
      <div className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
