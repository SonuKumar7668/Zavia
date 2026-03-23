import { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("resume", file,file.name);

    try {
        setLoading(true);
        setError(null);
        setSuccess(null);
        const backendUrl = import.meta.env.VITE_BACKEND_API;
      const res = await axios.post(
        `${backendUrl}/user/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
        setSuccess("Resume uploaded successfully");
        setLoading(false);
    } catch (err) {
        setError(err.response?.data?.message || "Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

        {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-2 bg-primary text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default ResumeUpload;