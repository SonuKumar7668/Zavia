import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";

const JobsExplore = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        location: filters.location,
        jobType: filters.jobType,
      }).toString();


    //   const { data } = await API.get(`/?${query}`);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API}/jobs?${query}`);
      setJobs(data.jobs);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
     <div className="min-h-screen bg-gray-50">

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 inline-block">
            Opportunities
          </span>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Explore Jobs
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Find opportunities that match your skills
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">

        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">

            {/* Sidebar Header */}
            <div className="px-5 py-4 border-b-2 border-primary bg-primary/5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Filters</h2>
            </div>

            <div className="p-5 flex flex-col gap-4">

              {/* Location Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Location
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    placeholder="e.g. Bangalore"
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition placeholder:text-gray-300"
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Job Type Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Job Type
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <select
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition appearance-none cursor-pointer"
                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                  >
                    <option value="">All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Apply Button */}
              <button
                onClick={fetchJobs}
                className="w-full bg-primary hover:bg-secondary text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Apply Filters
              </button>

            </div>
          </div>
        </aside>

        {/* Job List */}
        <main className="flex-1 min-w-0">

          {loading ? (
            /* Skeleton Loader */
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-1/3" />
                      <div className="h-3 bg-gray-100 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-6 bg-gray-100 rounded-lg w-16" />
                    <div className="h-6 bg-gray-100 rounded-lg w-20" />
                    <div className="h-6 bg-gray-100 rounded-lg w-14" />
                  </div>
                </div>
              ))}
            </div>

          ) : jobs.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold">No jobs found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters to see more results.</p>
            </div>

          ) : (
            <div className="grid gap-4">
              {/* Result count */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                {jobs.length} result{jobs.length !== 1 ? "s" : ""} found
              </p>
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
    
};

export default JobsExplore;