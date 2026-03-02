import { useState, useEffect } from "react";
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

  const handleNavigate = ()=>{
    navigate(`/mentor/profile/edit/${id}`);
  }

  if (!mentor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
<div className="min-h-screen bg-gray-50 px-6 py-12 flex justify-center">
  <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
    
    {/* Top Section */}
    <div className="flex flex-col md:flex-row gap-10">
      
      {/* Left: Main Profile Info */}
      <div className="flex-1">
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src="https://i.ibb.co/RpYtQM5Y/logo.png"
            alt={mentor.name}
            className="w-28 h-28 rounded-full border border-gray-200 object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {mentor.name}
            </h1>
            <p className="text-gray-500 text-sm">{mentor.country}</p>
            <p className="text-primary font-medium mt-1">
              {mentor.currentJob}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            About
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {mentor.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Quick Info Card */}
      <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
        
        <div>
          <p className="text-xs text-gray-400 uppercase">Education</p>
          <p className="text-sm font-medium text-gray-800">
            {mentor.highestEducation}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Experience</p>
          <p className="text-sm font-medium text-gray-800">
            {mentor.workExperience} years
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Rate</p>
          <p className="text-sm font-medium text-gray-800">
            {mentor.meetingCharge}/hr
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Availability</p>
          <p className="text-sm font-medium text-gray-800">
            {mentor.availability}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Languages</p>
          <p className="text-sm font-medium text-gray-800">
            {mentor.language.join(", ")}
          </p>
        </div>

        <button
          onClick={handleNavigate}
          className="w-full mt-4 bg-primary hover:bg-secondary text-white py-3 rounded-lg text-sm font-medium transition"
        >
          Edit Profile
        </button>
      </div>

    </div>
  </div>
</div>
  );
}
