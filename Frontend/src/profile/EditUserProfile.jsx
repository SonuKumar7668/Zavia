import { useState } from "react";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    location: "Bhopal, India",
    headline: "Aspiring Frontend Developer",
    summary:
      "Final year Computer Science student passionate about building scalable web applications.",
    preferredRoles: "Frontend Developer, React Developer",
    preferredLocation: "Remote, Bangalore",
    skills: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS"
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
    resume: null
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setNewSkill("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            placeholder="Full Name"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Professional Headline"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </section>

        {/* Career Summary */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Career Summary
          </h2>

          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="preferredRoles"
            value={formData.preferredRoles}
            onChange={handleChange}
            placeholder="Preferred Roles"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            placeholder="Preferred Location"
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
              placeholder="Add Skill"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
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
                {skill}
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

        {/* Experience */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Experience
          </h2>

          {formData.experience.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 space-y-3"
            >
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleExperienceChange(index, "duration", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                rows="3"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="text-primary text-sm font-medium"
          >
            + Add Experience
          </button>
        </section>

        {/* Resume Upload */}
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
            className="text-sm"
          />
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="border border-gray-200 px-5 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}