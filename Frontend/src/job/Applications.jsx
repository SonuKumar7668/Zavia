import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";

const ApplicationsPage = () => {
    const [activeTab, setActiveTab] = useState("applied");
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data
    useEffect(() => {
        fetchJobs();
    }, [activeTab]);

    const fetchJobs = async () => {
        try {
            setLoading(true);

            const endpoint =
                activeTab === "applied"
                    ? "/jobs/user/apply"
                    : "/jobs/user/save";
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}${endpoint}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            const data = await res.data;

            if (activeTab === "applied") {
                setAppliedJobs(data);
            } else {
                setSavedJobs(data);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const jobs = activeTab === "applied" ? appliedJobs : savedJobs;

    return (
        <div className="min-h-screen bg-[var(--color-background)] p-6">
            <h1 className="text-2xl font-semibold mb-6">My Jobs</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab("applied")}
                    className={`pb- 2 ${activeTab === "applied"
                            ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                            : "text-gray-500"
                        }`}
                >
                    Applied Jobs
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`pb - 2 ${activeTab === "saved"
                            ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                            : "text-gray-500"
                        } `}
                >
                    Saved Jobs
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading...</p>
            ) : jobs.length === 0 ? (
                <p className="text-gray-500">No jobs found</p>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsPage;