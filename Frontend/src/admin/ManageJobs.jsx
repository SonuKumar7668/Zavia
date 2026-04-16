import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
// import API from "../api/jobApi";
import axios from "axios";
import Header from "../components/Header";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API}/admin/jobs`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setJobs(data.jobs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ❌ Delete Job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API}/jobs/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Edit Job
  const handleEdit = (id) => {
    navigate(`/admin/jobs/edit/${id}`);
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Jobs</h1>

        <button
          onClick={() => navigate("/admin/jobs/create")}
          className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Create Job
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="space-y-4">

          {jobs.map((job) => (
            <div key={job._id} className="group bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 flex items-center justify-between gap-4">

              {/* Left: Info */}
              <div className="flex items-center gap-4 min-w-0">

                {/* Company Initial */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-extrabold text-primary">
                    {job.company?.[0]?.toUpperCase() ?? "?"}
                  </span>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h2 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {job.title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {job.company}
                    <span className="mx-1.5 text-gray-200">•</span>
                    {job.location}
                  </p>

                  {/* Badges */}
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {job.jobType}
                    </span>
                    <span className="text-[11px] font-semibold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                      {job.workMode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">

                <Link
                  to={`/admin/jobs/${job._id}/applications`}
                  className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Applications
                </Link>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(job._id)}
                  className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(job._id)}
                  className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ManageJobs;