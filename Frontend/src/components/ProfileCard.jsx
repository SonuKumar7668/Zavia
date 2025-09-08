// src/components/ProfileCard.jsx
import React from "react";
import profilePic from "../assets/profile.jpg"; // 👈 place your image inside /src/assets/

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative bg-gradient-to-r from-orange-400 to-pink-500 p-6 flex flex-col items-center">
  {/* Profile Image */}
  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
    <img
      src={profilePic}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Name + Role */}
  <h2 className="text-xl font-bold text-white mt-3">Zoya Khan</h2>
  <p className="text-sm text-white opacity-90">India</p>
  <p className="text-sm text-white">Senior Data Analyst</p>

  {/* Availability Badge */}
  <span className="absolute top-4 right-4 bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
    Available
  </span>
</div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Passionate Data Analyst with 8+ years of experience building
            scalable web applications. I love mentoring and sharing knowledge
            with fellow developers.
          </p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <p className="font-semibold">🎓 Education</p>
              <p>Master's in CS</p>
            </div>
            <div>
              <p className="font-semibold">💲Meeting Rate</p>
              <p>300/-hr</p>
            </div>
            <div>
              <p className="font-semibold">⏳ Experience</p>
              <p>8+ Years</p>
            </div>
            <div>
              <p className="font-semibold">🌍 Availability</p>
              <p>Weekdays 9-5 EST</p>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <p className="font-semibold text-sm text-gray-700">Languages</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["English", "Spanish", "French"].map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="font-semibold text-sm text-gray-700">Skills</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker",].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 rounded-xl font-semibold shadow hover:opacity-90 transition">
            Book Meeting
          </button>

          <div className="flex justify-between mt-4">
            <button className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              🔗 LinkedIn
            </button>
            <button className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              ✉️ Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
