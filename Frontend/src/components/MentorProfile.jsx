import React from "react";
import { Linkedin, Mail } from "lucide-react";

export default function MentorProfile() {
  const mentor = {
    name: "Aarav Mehta",
    country: "India",
    role: "Full Stack Developer",
    education: "B.Tech in Computer Science",
    experience: "6+ Years",
    rate: "$120/hr",
    availability: "Weekdays 6-10 PM IST",
    languages: ["English", "Hindi"],
    skills: ["React", "Node.js", "MongoDB", "AWS", "GraphQL"],
    image: "https://i.pravatar.cc/200?img=15",
    bio: "Passionate about helping students and early professionals build scalable applications. I enjoy mentoring and sharing real-world development practices.",
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{mentor.name}</h1>
            <p className="text-gray-500">{mentor.country}</p>
            <p className="text-purple-600 font-medium">{mentor.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-gray-700 leading-relaxed">{mentor.bio}</p>

        {/* Details */}
        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <strong>Education:</strong> {mentor.education}
          </p>
          <p>
            <strong>Experience:</strong> {mentor.experience}
          </p>
          <p>
            <strong>Rate:</strong> {mentor.rate}
          </p>
          <p>
            <strong>Availability:</strong> {mentor.availability}
          </p>
          <p>
            <strong>Languages:</strong> {mentor.languages.join(", ")}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">
            Book Meeting
          </button>
          <button className="flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
            <Linkedin size={20} />
          </button>
          <button className="flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
            <Mail size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
