// src/components/Education.js

import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section className="education-section">
      <h2>Free Career Learning Resources</h2>
      <p>Explore curated mentorship content, interview prep guides, and learning paths.</p>
      <div className="edu-links">
        <a href="#">Career Roadmaps →</a>
        <a href="#">Interview Tips →</a>
        <a href="#">Industry Talks →</a>
        <a href="#">Community Q&A →</a>
      </div>
    </section>
  );
};

export default Education;
