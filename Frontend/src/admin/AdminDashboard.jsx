// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const backendUrl = import.meta.env.VITE_BACKEND_API;
//       const res = await axios.get(`${backendUrl}/admin/dashboard`,{
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       });
//       setData(res.data);
//     };

//     fetchDashboard();
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   const { stats, jobs, recentApplicants } = data;

//   return (
//     <div className="p-6 bg-[var(--color-background)] min-h-screen">
      
//       {/* 🔹 KPI Section */}
//       <div className="grid md:grid-cols-3 gap-4 mb-8">
//         <div className="p-4 bg-white rounded-xl shadow">
//           <p className="text-gray-500">Total Jobs</p>
//           <h2 className="text-2xl font-bold">{stats.totalJobs}</h2>
//         </div>

//         <div className="p-4 bg-white rounded-xl shadow">
//           <p className="text-gray-500">Applicants</p>
//           <h2 className="text-2xl font-bold">{stats.totalApplicants}</h2>
//         </div>

//         <div className="p-4 bg-white rounded-xl shadow">
//           <p className="text-gray-500">Views</p>
//           <h2 className="text-2xl font-bold">{stats.totalViews}</h2>
//         </div>
//       </div>

//       {/* 🔹 Jobs Table */}
//       <div className="bg-white rounded-xl shadow p-4 mb-8">
//         <h2 className="text-lg font-semibold mb-4">Your Jobs</h2>

//         <table className="w-full text-sm">
//           <thead className="text-gray-600 border-b">
//             <tr>
//               <th className="p-2 text-left">Title</th>
//               <th className="p-2">Applicants</th>
//               <th className="p-2">Views</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{job.title}</td>
//                 <td className="p-2 text-center">
//                   {job.applicants.length}
//                 </td>
//                 <td className="p-2 text-center">{job.views}</td>
//                 <td className="p-2 text-center">
//                   {job.isActive ? "Active" : "Closed"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 Recent Applicants */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-4">
//           Recent Applicants
//         </h2>

//         <table className="w-full text-sm">
//           <thead className="text-gray-600 border-b">
//             <tr>
//               <th className="p-2 text-left">Name</th>
//               <th className="p-2">Job</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Applied</th>
//             </tr>
//           </thead>

//           <tbody>
//             {recentApplicants.map((app, i) => (
//               <tr key={i} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{app.user?.name}</td>
//                 <td className="p-2 text-center">{app.jobTitle}</td>
//                 <td className="p-2 text-center capitalize">
//                   {app.status}
//                 </td>
//                 <td className="p-2 text-center">
//                   {new Date(app.appliedAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
  pending:  { bg: "#FFF8EC", color: "#A05C00" },
  reviewed: { bg: "#EAF2FF", color: "#1A5FAB" },
  hired:    { bg: "#EAFAF1", color: "#1A7A45" },
  rejected: { bg: "#FEECEC", color: "#B02020" },
};

function Avatar({ name, status }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = {
    pending:  { bg: "#FFF8EC", color: "#A05C00" },
    reviewed: { bg: "#EAF2FF", color: "#1A5FAB" },
    hired:    { bg: "#EAFAF1", color: "#1A7A45" },
    rejected: { bg: "#FEECEC", color: "#B02020" },
    default:  { bg: "#EAF2FF", color: "#1A5FAB" },
  };

  const c = colors[status] ?? colors.default;

  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: c.bg,
        color: c.color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 500,
        marginRight: 8,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function StatusPill({ status }) {
  const s = statusStyles[status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 9px",
        borderRadius: 999,
        background: s.bg,
        color: s.color,
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
}

function JobBadge({ isActive }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        padding: "3px 9px",
        borderRadius: 999,
        background: isActive ? "#EAFAF1" : "#F3F4F6",
        color: isActive ? "#1A7A45" : "#6B7280",
        border: isActive ? "none" : "0.5px solid #D1D5DB",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isActive ? "#1A7A45" : "#9CA3AF",
        }}
      />
      {isActive ? "Active" : "Closed"}
    </span>
  );
}

function Panel({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #E5E7EB",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "0.5px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 500 }}>{title}</h2>
        <span style={{ fontSize: 12, color: "#9CA3AF", cursor: "pointer" }}>
          View all →
        </span>
      </div>
      {children}
    </div>
  );
}

function TableHead({ cols }) {
  return (
    <thead>
      <tr style={{ background: "#F9FAFB" }}>
        {cols.map((col, i) => (
          <th
            key={col}
            style={{
              padding: "8px 1.25rem",
              textAlign: i === 0 ? "left" : "center",
              fontSize: 11,
              fontWeight: 500,
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_API;
      const res = await axios.get(`${backendUrl}/admin/dashboard`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    };

    fetchDashboard();
  }, []);

  if (!data)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#9CA3AF",
          fontSize: 14,
        }}
      >
        Loading...
      </div>
    );

  const { stats, jobs, recentApplicants } = data;

  const formatViews = (v) =>
    v >= 1000 ? (v / 1000).toFixed(1) + "k" : v;

  const kpis = [
    { label: "Total jobs",      value: stats.totalJobs },
    { label: "Applicants",      value: stats.totalApplicants },
    { label: "Total views",     value: formatViews(stats.totalViews) },
  ];

  return (
    <div
      style={{
        padding: "1.5rem 1.5rem",
        minHeight: "100vh",
        background: "var(--color-background, #F3F4F6)",
        fontFamily: "var(--font-sans, sans-serif)",
      }}
    >
      {/* KPI cards */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#9CA3AF",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 12,
        }}
      >
        Overview
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 10,
          marginBottom: "2rem",
        }}
      >
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              background: "#fff",
              border: "0.5px solid #E5E7EB",
              borderRadius: 10,
              padding: "1rem 1.25rem",
            }}
          >
            <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
              {k.label}
            </p>
            <p style={{ fontSize: 28, fontWeight: 500, lineHeight: 1 }}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Jobs table */}
      <Panel title="Your jobs">
        <table
          style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}
        >
          <TableHead cols={["Title", "Applicants", "Views", "Status"]} />
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                style={{ borderTop: "0.5px solid #F3F4F6", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "11px 1.25rem", fontWeight: 500 }}>
                  {job.title}
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center", color: "#6B7280" }}>
                  {job.applicants.length}
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center", color: "#6B7280" }}>
                  {formatViews(job.views)}
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center" }}>
                  <JobBadge isActive={job.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* Recent applicants table */}
      <Panel title="Recent applicants">
        <table
          style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}
        >
          <TableHead cols={["Name", "Job", "Status", "Applied"]} />
          <tbody>
            {recentApplicants.map((app, i) => (
              <tr
                key={i}
                style={{ borderTop: "0.5px solid #F3F4F6", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "11px 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar name={app.user?.name} status={app.status} />
                    {app.user?.name}
                  </div>
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center", color: "#6B7280" }}>
                  {app.jobTitle}
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center" }}>
                  <StatusPill status={app.status} />
                </td>
                <td style={{ padding: "11px 1.25rem", textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
                  {new Date(app.appliedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}