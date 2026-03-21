import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    workMode: "On-site",
    skillsRequired: "",
    experienceRequired: "",
    educationRequired: "",
    applicationDeadline: "",
    description: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skillsRequired: form.skillsRequired
        .split(",")
        .map((s) => s.trim()),
    };

    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_API ;
      console.log(backendUrl);
      const result =await axios.post(`${backendUrl}/jobs/`, payload,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Job created:", result.data);
      navigate("/admin/jobs");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Create New Job</h1>
          <p className="text-gray-500 text-sm">
            Fill in the details to post a new job
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="title"
                placeholder="Job Title"
                className="input"
                onChange={handleChange}
              />

              <input
                name="company"
                placeholder="Company Name"
                className="input"
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                className="input"
                onChange={handleChange}
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary in INR"
                className="input"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">Job Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="jobType"
                className="input"
                onChange={handleChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>

              <select
                name="workMode"
                className="input"
                onChange={handleChange}
              >
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>

              <input
                name="experienceRequired"
                placeholder="Experience (e.g. 0-2 years)"
                className="input"
                onChange={handleChange}
              />

              <input
                name="educationRequired"
                placeholder="Education Required"
                className="input"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Salary Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Application Deadline</h2>
              <input
                name="applicationDeadline"
                type="date"
                className="input w-full"
                onChange={handleChange}
              />
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-lg font-medium mb-4">Skills Required</h2>

            <input
              name="skillsRequired"
              placeholder="e.g. React, Node, MongoDB"
              className="input w-full"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-medium mb-4">Job Description</h2>

            <textarea
              name="description"
              rows={5}
              placeholder="Write detailed job description..."
              className="input w-full"
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary text-white"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateJob;