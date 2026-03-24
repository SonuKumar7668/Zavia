import { useEffect, useState } from "react";
import { useParams,Link } from "react-router";
import axios from "axios";
// import { set } from "mongoose";
// import User from "../../../backend/models/userModel";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const User = localStorage.getItem("userId");
  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API}/jobs/${id}`);
      setJob(data.job);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/jobs/apply`, { jobId: id }, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Application submitted!");
      fetchJob(); // Refresh job details to update application status
    } catch (err) {
      console.error("Error applying for job:", err);
      alert("Failed to apply. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/jobs/save`, { jobId: id }, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert(saved ? "Job removed from saved list" : "Job saved!");
      setSaved(!saved);
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job. Please try again.");
    }
  };

  const checkIfApplied = () => {
    if (job && job.applicants) {
      return job.applicants.some(applicant => applicant.user === User);
    }
    return false;
  };

  const checkIfSaved = () => {
    if (job && job.savedBy) {
      setSaved(job.savedBy.some(userId => userId === User));
    }
  }

  useEffect(() => {
    if (job) {
      setApplied(checkIfApplied());
      checkIfSaved();
    }
  }, [job]);

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading || !job) {
    return <div className="flex items-center justify-center h-screen">Loading job...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">

        {/* Top Card */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-gray-500">{job.company}</p>
              <p className="text-sm text-gray-400">{job.location}</p>
            </div>

            <span className="bg-gray-100 px-3 py-1 text-sm rounded">
              {job.jobType}
            </span>
          </div>

          {/* Salary */}
          {job.salary?.min && (
            <p className="mt-3 text-green-600 font-medium">
              ₹{job.salary.min} - ₹{job.salary.max}
            </p>
          )}

          {/* Actions */}
          <div className="mt-5 flex gap-3">
            <button disabled={applied} onClick={handleApply} className="cursor-pointer bg-primary text-white px-5 py-2 rounded-lg">
              {applied ? "Applied" : "Apply Now"}
            </button>

            <button onClick={handleSave} disabled={saved} className="cursor-pointer border px-5 py-2 rounded-lg">
              {saved ? "Saved" : "Save Job"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Left Content */}
          <div className="md:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Job Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Skills Required
              </h2>

              <div className="flex flex-wrap gap-2">
                {job.skillsRequired?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-3 py-1 text-sm rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Job Info */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Job Overview
              </h2>

              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Work Mode:</strong> {job.workMode}</p>
                <p><strong>Experience:</strong> {job.experienceRequired}</p>
                <p><strong>Education:</strong> {job.educationRequired}</p>
                <p><strong>Deadline:</strong> {job.applicationDeadline?.slice(0, 10)}</p>
              </div>
            </div>

            {/* Zavia USP */}
            <div className="bg-primary/10 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">
                Need Guidance?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Talk to a mentor before applying for this job.
              </p>

              <button className="bg-primary text-white px-4 py-2 rounded-lg w-full">
                <Link to="/explore" className="w-full h-full block">
                Talk to Mentor
                </Link>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;