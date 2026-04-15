import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ResumeUpload from "./ResumeUpload";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    // Fetch user profile data from backend
    fetchProfile();
  }, []);

      const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_API;
        const res = await axios.get(`${backendUrl}/user/profile`, {
          headers: { Authorization: token },
        });
        setFormData(res.data.user);

      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

  console.log("formData", formData);

  // Handle simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle nested fields (jobPreferences)
  const handlePreferenceChange = (field, value) => {
    setFormData({
      ...formData,
      jobPreferences: {
        ...formData.jobPreferences,
        [field]: value.split(","),
      },
    });
  };

  // Skills
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: "intermediate" }],
    });
  };

  const updateSkill = (index, key, value) => {
    const updated = [...formData.skills];
    updated[index][key] = value;
    setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated });
  };

  // Experience
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { title: "", company: "", description: "" },
      ],
    });
  };

  const updateExperience = (index, key, value) => {
    const updated = [...formData.experience];
    updated[index][key] = value;
    setFormData({ ...formData, experience: updated });
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  // Education
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institute: "", year: "", grade: "" },
      ],
    });
  };

  const updateEducation = (index, key, value) => {
    const updated = [...formData.education];
    updated[index][key] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  // Projects
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", techStack: [] },
      ],
    });
  };

  const updateProject = (index, key, value) => {
    const updated = [...formData.projects];
    updated[index][key] =
      key === "techStack" ? value.split(",") : value;
    setFormData({ ...formData, projects: updated });
  };

  const removeProject = (index) => {
    const updated = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updated });
  };

  const updateProfile = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_API;
      const res = await axios.put(
        `${backendUrl}/user/profile`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.success) {
        navigate("/user/profile");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  }

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    // onSave(formData);
  };

  if (!formData) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Loading profile...</p>
    </div>
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <ResumeUpload fetchProfile={fetchProfile}/>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Basic Info</h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input mt-3"
          />
        </div>

        {/* CAREER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Career Summary</h2>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input h-24"
          />
        </div>

        {/* PREFERENCES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Preferences</h2>

          <input
            type="text"
            value={formData.jobPreferences?.roles?.join(",")}
            onChange={(e) =>
              handlePreferenceChange("roles", e.target.value)
            }
            placeholder="Roles (comma separated)"
            className="input"
          />

          <input
            type="text"
            value={formData.jobPreferences?.locations?.join(",")}
            onChange={(e) =>
              handlePreferenceChange("locations", e.target.value)
            }
            placeholder="Locations"
            className="input mt-3"
          />
        </div>

        {/* SKILLS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Skills</h2>

          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={skill.name}
                onChange={(e) =>
                  updateSkill(index, "name", e.target.value)
                }
                placeholder="Skill"
                className="input"
              />

              <select
                value={skill.level}
                onChange={(e) =>
                  updateSkill(index, "level", e.target.value)
                }
                className="input"
              >
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>

              <button type="button" onClick={() => removeSkill(index)}>
                ❌
              </button>
            </div>
          ))}

          <button type="button" onClick={addSkill}>
            + Add Skill
          </button>
        </div>

        {/* EXPERIENCE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Experience</h2>

          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <input
                placeholder="Title"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(index, "title", e.target.value)
                }
                className="input"
              />
              <input
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="input mt-2"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="input mt-2"
              />
              <button onClick={() => removeExperience(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addExperience}>
            + Add Experience
          </button>
        </div>

        {/* EDUCATION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Education</h2>

          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">

              <input
                placeholder="Degree (e.g. B.Tech CSE)"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                className="input"
              />

              <input
                placeholder="Institute"
                value={edu.institute}
                onChange={(e) =>
                  updateEducation(index, "institute", e.target.value)
                }
                className="input mt-2"
              />

              <input
                placeholder="Year (e.g. 2026)"
                value={edu.year}
                onChange={(e) =>
                  updateEducation(index, "year", e.target.value)
                }
                className="input mt-2"
              />

              <input
                placeholder="Grade / CGPA (e.g. 8.5 CGPA)"
                value={edu.grade}
                onChange={(e) =>
                  updateEducation(index, "grade", e.target.value)
                }
                className="input mt-2"
              />

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>

            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="text-blue-600 text-sm"
          >
            + Add Education
          </button>
        </div>

        {/* PROJECTS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Projects</h2>

          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-3">
              <input
                placeholder="Title"
                value={proj.title}
                onChange={(e) =>
                  updateProject(index, "title", e.target.value)
                }
                className="input"
              />

              <textarea
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                className="input mt-2"
              />

              <input
                placeholder="Tech Stack (comma separated)"
                value={proj.techStack.join(",")}
                onChange={(e) =>
                  updateProject(index, "techStack", e.target.value)
                }
                className="input mt-2"
              />

              <button onClick={() => removeProject(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addProject}>
            + Add Project
          </button>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
};
export default EditProfile;