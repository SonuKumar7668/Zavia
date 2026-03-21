// admin/ManageJobs.jsx
import { useEffect, useState } from "react";
// import API from "../api/jobApi";
import axios from "axios";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API}/jobs`);
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    await API.delete(`/${id}`);
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} className="border p-3 mb-2 flex justify-between">
          <span>{job.title}</span>
          <button
            onClick={() => deleteJob(job._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageJobs;