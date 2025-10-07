import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";

export default function MentorProfile() {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [booked, setBooked] = useState(false);
  const { id } = useParams();

  // useEffect(() => {
  //   const checkBooked = async () => {
  //     if(!localStorage.getItem("token")) return;
  //     const backendUrl = import.meta.env.VITE_BACKEND_API;
  //     try {
  //       const response = await axios.get(`${backendUrl}/session/check/${id}`,
  //         {
  //           headers: {
  //             Authorization: `${localStorage.getItem("token")}`
  //           }
  //         });
  //       setBooked(response.data.booked);
  //     } catch (err) {
  //       console.log("Error checking booked status",err);
  //     }
  //   }
  //   checkBooked();
  // }, []);

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
    <div className=" bg-white flex justify-center px-4 pb-12">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={"https://i.ibb.co/RpYtQM5Y/logo.png"}
            alt={mentor.name}
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{mentor.name}</h1>
            <p className="text-gray-500">{mentor.country}</p>
            <p className="text-secondary font-medium">{mentor.currentJob}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-gray-700 leading-relaxed">{mentor.bio}</p>

        {/* Details */}
        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <strong>Education:</strong> {mentor.highestEducation}
          </p>
          <p>
            <strong>Experience:</strong> {mentor.workExperience} years
          </p>
          <p>
            <strong>Rate:</strong> {mentor.meetingCharge}/hr
          </p>
          <p>
            <strong>Availability:</strong> {mentor.availability}___
          </p>
          <p>
            <strong>Languages:</strong> {mentor.language.join(", ")}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-100 text-primary text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button  className="cursor-pointer flex-1 bg-primary hover:bg-secondary text-white py-2 rounded-lg font-medium" >
          <Link to={`/mentor/profile/edit/${id}`}>
          Edit Dashboard  
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
