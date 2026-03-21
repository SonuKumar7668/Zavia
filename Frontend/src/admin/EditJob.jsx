import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const EditJob = () => {
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

    const jobId = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_API;
                const result = await axios.get(`${backendUrl}/jobs/${jobId}`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    });
                const jobData = result.data.job;
                setForm(jobData);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };

        fetchJob();
    }, [jobId]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            skillsRequired: Array.isArray(form.skillsRequired)
                ? form.skillsRequired
                : form.skillsRequired.split(",").map((s) => s.trim()),
        };

        try {
            setLoading(true);
            const backendUrl = import.meta.env.VITE_BACKEND_API;
            console.log(backendUrl);
            const result = await axios.put(`${backendUrl}/jobs/${jobId}`, payload,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Job updated:", result.data);
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
                    <h1 className="text-2xl font-semibold">Update Job</h1>
                    <p className="text-gray-500 text-sm">
                        Fill in the details to update the job
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
                                value={form.title}
                                onChange={handleChange}
                            />

                            <input
                                name="company"
                                placeholder="Company Name"
                                className="input"
                                value={form.company}
                                onChange={handleChange}
                            />

                            <input
                                name="location"
                                placeholder="Location"
                                className="input"
                                value={form.location}
                                onChange={handleChange}
                            />

                            <input
                                name="salary"
                                placeholder="Salary in INR"
                                className="input"
                                value={form.salary}
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
                                value={form.jobType}
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
                                value={form.workMode}
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
                                value={form.experienceRequired}
                                onChange={handleChange}
                            />

                            <input
                                name="educationRequired"
                                placeholder="Education Required"
                                className="input"
                                value={form.educationRequired}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Deadline Section */}
                    <div>
                        <h2 className="text-lg font-medium mb-4">Application Deadline</h2>
                        <input
                            name="applicationDeadline"
                            type="date"
                            className="input w-full"
                            value={form.applicationDeadline ? form.applicationDeadline.split("T")[0] : ""}
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
                            value={form.skillsRequired}
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
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="cursor-pointer px-4 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer px-6 py-2 rounded-lg bg-primary text-white"
                        >
                            {loading ? "Updating..." : "Update Job"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditJob;