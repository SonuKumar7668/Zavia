import React from "react";
import {Link} from "react-router";
import axios from "axios";
import {useState,useEffect} from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    // Fetch user profile data from backend
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile...");
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_API;
        const res = await axios.get(`${backendUrl}/user/profile`, {
          headers: { Authorization: token },
        });
        setUser(res.data.user);
        
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  },[]);
  if(!user){
    return <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Loading profile...</p>
    </div>
  }
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={user.avatar || "https://res.cloudinary.com/dru0wofgf/image/upload/profileIcon_wri6eb.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">
            {user.preferences?.roles?.join(", ")} • {user.location}
          </p>

          <div className="mt-2 flex items-center gap-4">
            {user.openToWork && (
              <span className="text-green-600 font-medium">
                Open to Work
              </span>
            )}
            <span className="text-sm text-gray-500">
              Profile Completion: {user.profileCompletion}%
            </span>
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href={user.resume?.url}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Download Resume
            </a>
            <Link to="/user/profile/edit">
              <button className="border px-4 py-2 rounded-lg text-sm">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CAREER SUMMARY */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-2">Career Summary</h2>
        <p className="text-gray-700">{user.bio}</p>
      </div>

      {/* PREFERENCES */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-2">Preferred Roles</h2>
          <p className="text-gray-700">
            {user.jobPreferences.roles?.join(", ")} 
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-2">Preferred Location</h2>
          <p className="text-gray-700">
            {user.jobPreferences?.locations?.join(", ")}
          </p>
        </div>
      </div>

      {/* SKILLS */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Experience</h2>
        {user.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-medium">{exp.title}</h3>
            <p className="text-gray-600 text-sm">
              {exp.company} 
            </p>
            <p className="text-gray-700 text-sm mt-1">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Education</h2>

        {user.education?.length > 0 ? (
          user.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{edu.degree}</h3>
              <p className="text-gray-600 text-sm">
                {edu.institute} • {edu.year}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No education added</p>
        )}
      </div>

      {/* PROJECTS */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>

        {user.projects?.length > 0 ? (
          user.projects.map((project, index) => (
            <div key={index} className="mb-5 border-b pb-4 last:border-none">

              <h3 className="font-medium text-base">
                {project.title}
              </h3>

              <p className="text-gray-700 text-sm mt-1">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-3 text-sm">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    className="text-blue-600"
                  >
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    className="text-green-600"
                  >
                    Live Demo
                  </a>
                )}
              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No projects added</p>
        )}
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">

        {/* Mentorship */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Mentorship Activity</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">
                {user.mentorshipStats?.sessionsCompleted}
              </p>
              <p className="text-sm text-gray-500">Sessions</p>
            </div>
            <div>
              <p className="text-xl font-bold">
                {user.mentorshipStats?.mentorsConnected}
              </p>
              <p className="text-sm text-gray-500">Mentors</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {user.mentorshipStats?.careerTrack}
          </p>
        </div>

        {/* Job Stats */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Job Applications</h2>
          <div className="grid grid-cols-4 text-center text-sm">
            <div>
              <p className="font-bold">
                {user.jobStats?.applied}
              </p>
              <p className="text-gray-500">Applied</p>
            </div>
            <div>
              <p className="font-bold">
                {user.jobStats?.shortlisted}
              </p>
              <p className="text-gray-500">Shortlisted</p>
            </div>
            <div>
              <p className="font-bold">
                {user.jobStats?.interviews}
              </p>
              <p className="text-gray-500">Interview</p>
            </div>
            <div>
              <p className="font-bold">
                {user.jobStats?.offers}
              </p>
              <p className="text-gray-500">Offers</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;