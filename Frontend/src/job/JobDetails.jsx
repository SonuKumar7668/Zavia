import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

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
            <button className="bg-primary text-white px-5 py-2 rounded-lg">
              Apply Now
            </button>

            <button className="border px-5 py-2 rounded-lg">
              Save Job
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
                <p><strong>Deadline:</strong> {job.applicationDeadline?.slice(0,10)}</p>
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
                Talk to Mentor
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;