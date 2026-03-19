import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-gray-900 tracking-tight">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-secondary transition"
          >
            Go to Home
          </Link>

          {/* <Link
            to="/jobs"
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
          >
            Browse Jobs
          </Link> */}

          <Link
            to="/explore"
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
          >
            Find Mentors
          </Link>

        </div>

        {/* Footer Hint */}
        <p className="mt-12 text-xs text-gray-400">
          If you believe this is an error, please contact support.
        </p>

      </div>
    </div>
  );
}