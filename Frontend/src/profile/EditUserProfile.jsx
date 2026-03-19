import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    location: "Bhopal, India",
    headline: "Aspiring Frontend Developer",
    summary:
      "Final year Computer Science student passionate about building scalable web applications.",
    preferredRoles: "Frontend Developer, React Developer",
    preferredLocation: "Remote, Bangalore",
    skills: [{ name: "JavaScript", level: "intermediate" },
    { name: "React", level: "beginner" },
    { name: "Node.js", level: "beginner" }
    ],
    experience: [
      {
        role: "Frontend Intern",
        company: "TechNova Solutions",
        duration: "Jan 2025 – June 2025",
        description:
          "Built reusable UI components and improved performance by 20%."
      }
    ],
    resume: null,
    profileImage: null
  });
  const navigate = useNavigate();
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newSkillLevel, setNewSkillLevel] = useState("intermediate");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setFormData({
        ...formData,
        skills: [
          ...formData.skills,
          { name: newSkill, level: newSkillLevel }
        ]
      });
      setNewSkill("");
      setNewSkillLevel("intermediate");
    }
  };

  const handleSkillRemove = (index) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { role: "", company: "", duration: "", description: "" }
      ]
    });
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  /* ===============================
     SUBMIT WITH AXIOS
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      // Append text fields
      data.append("name", formData.name);
      data.append("headline", formData.headline);
      data.append("location", formData.location);
      data.append("bio", formData.summary);
      data.append("preferredRoles", formData.preferredRoles);
      data.append("preferredLocation", formData.preferredLocation);

      // Append JSON fields
      data.append("skills", JSON.stringify(formData.skills));
      data.append("experience", JSON.stringify(formData.experience));

      // Append files if exist
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const backendUrl = import.meta.env.VITE_BACKEND_API;
      const response = await axios.put(
        `${backendUrl}/user/update-profile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`
          }
        }
      );

      console.log(response.data);
      navigate("/user/profile");

    } catch (err) {
      console.error(err);
      setError("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-10 space-y-10"
      >
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Profile
        </h1>

        {/* Basic Info */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Basic Information
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </section>

        {/* Skills */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Skills
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill name"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />

            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <button
              type="button"
              onClick={handleSkillAdd}
              className="bg-primary text-white px-4 rounded-lg text-sm"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center gap-2"
              >
                {skill.name} • {skill.level}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(i)}
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* Resume */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Resume
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFormData({ ...formData, resume: e.target.files[0] })
            }
          />
        </section>

        {/* Profile Image */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Image
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, profileImage: e.target.files[0] })
            }
          />
        </section>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}