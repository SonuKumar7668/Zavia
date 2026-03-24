const JobCards = ({ job, type }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-sm text-gray-600">
          {job.company} • {job.location}
        </p>

        {type === "applied" && (
          <p className="text-xs text-gray-500 mt-1">
            Applied on: {new Date(job.appliedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
          View
        </button>

        {type === "saved" && (
          <button className="px-3 py-1 text-sm bg-[var(--color-primary)] text-white rounded-md">
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCards;