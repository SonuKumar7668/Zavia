import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function MentorProfile() {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [booked, setBooked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const checkBooked = async () => {
      if(!localStorage.getItem("token")) return;
      const backendUrl = import.meta.env.VITE_BACKEND_API;
      try {
        const response = await axios.get(`${backendUrl}/session/check/${id}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`
            }
          });
        setBooked(response.data.booked);
      } catch (err) {
        console.log("Error checking booked status",err);
      }
    }
    checkBooked();
  }, []);

  const bookSession = async () => {
    if (booked) return;
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_API;
    try {
      const response = await axios.post(`${backendUrl}/session/create`, { mentorId: id },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        });
      console.log("Session booked successfully:", response.data);
      setBooked(true);
    } catch (error) {
      console.error("Error booking session:", error);
    }
  }

  useEffect(() => {
    const fetchMentor = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_API;
      try {
        const response = await axios.get(`${backendUrl}/mentor/${id}`);
        setMentor(response.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };
    fetchMentor();
  }, [id])

  if (!mentor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6 flex justify-center">
  <div className="max-w-6xl w-full grid md:grid-cols-3 gap-10">

    {/* LEFT SECTION — MAIN PROFILE */}
    <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src="https://i.ibb.co/RpYtQM5Y/logo.png"
          alt={mentor.name}
          className="w-28 h-28 rounded-full object-cover border border-gray-200"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold text-gray-900">
            {mentor.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mentor.country}
          </p>
          <p className="text-primary font-medium mt-2">
            {mentor.currentJob}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          About
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {mentor.bio}
        </p>
      </div>

      {/* Details Grid */}
      <div className="mt-10 grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-400 uppercase text-xs">Education</p>
          <p className="font-medium text-gray-800">
            {mentor.highestEducation}
          </p>
        </div>

        <div>
          <p className="text-gray-400 uppercase text-xs">Experience</p>
          <p className="font-medium text-gray-800">
            {mentor.workExperience} years
          </p>
        </div>

        <div>
          <p className="text-gray-400 uppercase text-xs">Languages</p>
          <p className="font-medium text-gray-800">
            {mentor.language.join(", ")}
          </p>
        </div>

        <div>
          <p className="text-gray-400 uppercase text-xs">Availability</p>
          <p className="font-medium text-gray-800">
            {mentor.availability}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {mentor.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>

    {/* RIGHT SECTION — BOOKING CARD */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-fit sticky top-24">
      
      <div className="text-center">
        <p className="text-sm text-gray-500">Session Rate</p>
        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
          ₹{mentor.meetingCharge}
          <span className="text-base font-normal text-gray-500 ml-1">
            / hour
          </span>
        </h2>
      </div>

      <button
        onClick={bookSession}
        className="w-full mt-8 bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium text-sm transition duration-200"
      >
        {booked ? "Meeting Booked" : "Book Session"}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Secure payment • Instant confirmation
      </p>

    </div>

  </div>
</div>
  );
}
