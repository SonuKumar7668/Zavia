import { Link } from "react-router";

const JobCard = ({ job }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 flex flex-col gap-4 overflow-hidden">

      {/* Subtle accent bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Company Initial Avatar */}
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">
              {job.company?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
              {job.title}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">{job.company}</p>
          </div>
        </div>

        {/* Job Type Badge */}
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-widest text-primary bg-indigo-50 px-2.5 py-1 rounded-full">
          {job.jobType}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
        {/* Location */}
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>

        {/* Salary */}
        {job.salary?.min && (
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ₹{job.salary.min}–{job.salary.max}
          </span>
        )}
      </div>

      {/* Skills */}
      {job.skillsRequired?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.skillsRequired.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg tracking-wide"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > 4 && (
            <span className="text-[11px] font-medium text-gray-400 px-2 py-1">
              +{job.skillsRequired.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-auto pt-1">
        <Link
          to={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors group/link"
        >
          View Details
          <svg
            className="w-4 h-4 translate-x-0 group-hover/link:translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;