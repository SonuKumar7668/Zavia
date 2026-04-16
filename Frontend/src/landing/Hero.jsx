
import { Link } from "react-router";
import { useState, useEffect } from "react";
const Hero = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userid");
    setUserId(id);
  }, []);

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Your Career, Guided Smarter
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Connect with mentors, explore job opportunities, and get AI-powered
            career guidance — all in one platform.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-4">

            {/* Primary CTA */}
            <Link to={`/user/profile/${userId}`} className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition">
              Get Started
            </Link>

            {/* Secondary CTA */}
            <Link to="/chat" className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-secondary hover:text-white transition">
              Talk to AI Guide
            </Link>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Trusted by students & professionals for smarter career decisions
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          {/* Gradient Card (using variables) */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 shadow-xl">

            {/* AI Box */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-primary">
                AI Career Assistant
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                “Based on your profile, Frontend Development is a great fit.”
              </p>
            </div>

            {/* Job Box */}
            <div className="mt-4 bg-white rounded-xl p-4">
              <h3 className="font-semibold text-primary">
                Recommended Job
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                React Developer • Remote • ₹6–10 LPA
              </p>
            </div>

          </div>

          {/* Highlight Badge */}
          <div className="absolute -top-4 -right-4 bg-highlight text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
            AI Powered
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;