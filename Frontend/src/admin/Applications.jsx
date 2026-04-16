import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMemo } from "react";
import { Link } from "react-router";
export default function Applications() {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                console.log("Fetching applications for job ID:", id);
                const  response  = await axios.get(`${import.meta.env.VITE_BACKEND_API}/admin/job/${id}/applications`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,  
                    },
                });
                setApplicants(response.data.applications.applicants);
                console.log("Applications fetched successfully:", response.data.applications.applicants);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplications();
    }, [id]);
    // Transform data for table + CSV
  const rows = useMemo(() => {
    return applicants.map((app) => ({
      name: app.user?.name || "",
      id:app.user?._id || "",
      email: app.user?.email || "",
      location: app.user?.location || "",
      status: app.status,
      appliedAt: new Date(app.appliedAt).toLocaleDateString(),
      skills: app.user?.skills?.map((s) => s.name).join(", ") || "",
      resume: app.user?.resume?.url || "",
    }));
  }, [applicants]);

  // CSV Download
  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Location",
      "Status",
      "Applied At",
      "Skills",
      "Resume Link",
    ];

    const csvRows = [
      headers.join(","),
      ...rows.map((row) =>
        [
          row.name,
          row.email,
          row.location,
          row.status,
          row.appliedAt,
          `"${row.skills}"`,
          row.resume,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "applicants.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

    return (
        <div className="p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Applicants</h2>

        <button
          onClick={downloadCSV}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Resume</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.location}</td>
                  <td className="p-3 capitalize">{row.status}</td>
                  <td className="p-3">{row.appliedAt}</td>
                  <td className="p-3">{row.resume ? (
                      <Link
                        to={`/user/profile/${row.id}?view=public`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </Link>
                    ) : (
                      "-"
                    )}</td>
                  <td className="p-3">
                    {row.resume ? (
                      <a
                        href={row.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No applicants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
}