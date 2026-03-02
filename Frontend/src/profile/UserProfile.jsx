import { Link } from "react-router";
export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
  <div className="max-w-6xl w-full space-y-8">

    {/* ================= HEADER ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        
        <img
          src="https://i.pravatar.cc/150?img=12"
          className="w-28 h-28 rounded-full object-cover border border-gray-200"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900">
            Aarav Sharma
          </h1>
          <p className="text-gray-500 mt-1">
            Aspiring Frontend Developer • Bhopal, India
          </p>

          <div className="flex items-center gap-4 mt-4">
            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              Open to Work
            </span>
            <span className="text-sm text-gray-500">
              Profile Completion: 85%
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Download Resume
          </button>
          <Link to="/user/profile/edit" className="bg-primary text-white px-5 py-2 rounded-lg text-sm">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>


    {/* ================= CAREER SUMMARY ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Career Summary
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed">
        Final year Computer Science student passionate about building scalable
        web applications. Strong foundation in React, Node.js and MongoDB.
        Seeking entry-level Frontend Developer opportunities in product-based
        companies.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-400 uppercase text-xs">Preferred Roles</p>
          <p className="font-medium text-gray-800">
            Frontend Developer, React Developer
          </p>
        </div>
        <div>
          <p className="text-gray-400 uppercase text-xs">Preferred Location</p>
          <p className="font-medium text-gray-800">
            Remote, Bangalore
          </p>
        </div>
      </div>
    </div>


    {/* ================= SKILLS ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3">
        {[
          "React.js",
          "Next.js",
          "Node.js",
          "MongoDB",
          "Express",
          "Tailwind CSS",
          "REST APIs",
          "Git & GitHub",
          "JavaScript (ES6+)",
          "Data Structures"
        ].map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>


    {/* ================= EXPERIENCE ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Experience
      </h2>

      <div className="space-y-6">

        <div className="border-l-2 border-gray-200 pl-5">
          <h3 className="font-semibold text-gray-900">
            Frontend Intern
          </h3>
          <p className="text-sm text-gray-500">
            TechNova Solutions • Jan 2025 – June 2025
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Built reusable UI components using React and Tailwind CSS.
            Improved page load performance by 20% through optimization.
          </p>
        </div>

        <div className="border-l-2 border-gray-200 pl-5">
          <h3 className="font-semibold text-gray-900">
            Freelance Web Developer
          </h3>
          <p className="text-sm text-gray-500">
            Self-Employed • 2024 – Present
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Developed portfolio websites and landing pages for local clients.
            Integrated payment gateways and deployed projects on Vercel.
          </p>
        </div>

      </div>
    </div>


    {/* ================= MENTORSHIP ACTIVITY ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Mentorship Activity
      </h2>

      <div className="grid sm:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-2xl font-semibold text-gray-900">6</p>
          <p className="text-sm text-gray-500">Sessions Completed</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">3</p>
          <p className="text-sm text-gray-500">Mentors Connected</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">Frontend Track</p>
          <p className="text-sm text-gray-500">Career Path Selected</p>
        </div>
      </div>
    </div>


    {/* ================= JOB APPLICATION TRACKER ================= */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Job Applications
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-sm">

        {[
          { title: "Applied", count: 12 },
          { title: "Shortlisted", count: 3 },
          { title: "Interview", count: 2 },
          { title: "Offers", count: 1 }
        ].map((stage, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center"
          >
            <p className="text-2xl font-semibold text-gray-900">
              {stage.count}
            </p>
            <p className="text-gray-500 mt-1">{stage.title}</p>
          </div>
        ))}

      </div>
    </div>

  </div>
</div>
    )
}