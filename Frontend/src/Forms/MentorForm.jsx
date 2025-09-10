import { useState } from "react";
import axios from "axios";
import { X, Plus, Upload, User, MapPin, Briefcase, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router";
//import { toast } from "@/hooks/use-toast"; // keep if you are using toast, otherwise remove

export default function MentorForm() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    country: "",
    state: "",
    city: "",
    profileImg: "",
    language: [],
    skills: [],
    meetingCharge: 0,
    availability: "",
    status: "",
    linkedInURL: "",
    gender: "",
    highestEducation: "",
    workExperience: "",
    currentJob: "",
    socialMediaLinks: [],
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newSocialLink, setNewSocialLink] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field, value) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      handleInputChange(field, [...formData[field], value.trim()]);
    }
  };

  const removeArrayItem = (field, index) => {
    handleInputChange(
      field,
      formData[field].filter((_, i) => i !== index)
    );
  };
  const submitForm = async () => {
    const api = import.meta.env.VITE_BACKEND_API;
    try {
      const response = await axios.post(`${api}/user/mentor/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log("Server Response:", response.data);
      localStorage.setItem("role","mentor");
      navigate("/");

      // toast({
      //   title: "Profile Created Successfully!",
      //   description: "Your professional profile has been saved.",
      // });
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast({
      //   title: "Error",
      //   description: "There was an error creating your profile. Please try again.",
      //   variant: "destructive",
      // });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
    // toast({
    //   title: "Profile Created Successfully!",
    //   description: "Your professional profile has been saved.",
    // });
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Create Your Professional Profile</h1>
          <p className="text-lg text-muted-foreground">
            Share your expertise and connect with others
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Tell us about yourself</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-medium">Full Name *</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full border rounded p-2 transition-smooth"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block font-medium">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full border rounded p-2 transition-smooth"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="bio" className="block font-medium">Bio</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full border rounded p-2 min-h-[100px] resize-none transition-smooth"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="profileImg" className="block font-medium">Profile Image URL</label>
              <div className="flex gap-2">
                <input
                  id="profileImg"
                  value={formData.profileImg}
                  onChange={(e) => handleInputChange("profileImg", e.target.value)}
                  placeholder="Upload your profile image"
                  disabled
                  className="flex-1 border rounded p-2 transition-smooth"
                />
                <button
                  type="button"
                  className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Location</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Where are you based?</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="country" className="block font-medium">Country</label>
                <input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="India"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="state" className="block font-medium">State</label>
                <input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="Bihar"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium">City</label>
                <input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Patna"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Professional Information</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your career and expertise</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentJob" className="block font-medium">Current Job</label>
                <input
                  id="currentJob"
                  value={formData.currentJob}
                  onChange={(e) => handleInputChange("currentJob", e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="highestEducation" className="block font-medium">Highest Education</label>
                <input
                  id="highestEducation"
                  value={formData.highestEducation}
                  onChange={(e) => handleInputChange("highestEducation", e.target.value)}
                  placeholder="Bachelor's in CS"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="workExperience" className="block font-medium">Work Experience in Years</label>
              {/* <textarea
                id="workExperience"
                value={formData.workExperience}
                onChange={(e) => handleInputChange("workExperience", e.target.value)}
                placeholder="Describe your work experience..."
                className="w-full border rounded p-2 min-h-[100px]"
              /> */}
              <input
                  id="meetingCharge"
                  type="number"
                  value={formData.workExperience}
                  onChange={(e) => handleInputChange("workExperience",e.target.value)}
                  placeholder="3 (in years)"
                  className="w-full border rounded p-2"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label htmlFor="meetingCharge" className="block font-medium">Meeting Charge in hours</label>
                <input
                  id="meetingCharge"
                  type="number"
                  value={formData.meetingCharge}
                  onChange={(e) => handleInputChange("meetingCharge", e.target.value)}
                  placeholder="150"
                  min="0"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block font-medium">Availability</label>
                <select
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select availability</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="freelance">Freelance</option>
                  <option value="not-available">Not Available</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block font-medium">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills & Languages */}
          <div className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Skills & Languages</h2>
            </div>

            {/* Languages */}
            <div className="mt-4">
              <label className="block font-medium">Languages</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("language", newLanguage);
                      setNewLanguage("");
                    }
                  }}
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    addArrayItem("language", newLanguage);
                    setNewLanguage("");
                  }}
                  className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.language.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-1"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("language", index)}
                      className="ml-1 text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <label className="block font-medium">Skills</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("skills", newSkill);
                      setNewSkill("");
                    }
                  }}
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    addArrayItem("skills", newSkill);
                    setNewSkill("");
                  }}
                  className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("skills", index)}
                      className="ml-1 text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Social & Professional Links</h2>
            </div>

            <div className="mt-4">
              <label htmlFor="linkedInURL" className="block font-medium">LinkedIn Profile</label>
              <input
                id="linkedInURL"
                value={formData.linkedInURL}
                onChange={(e) => handleInputChange("linkedInURL", e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-6">
              <label className="block font-medium">Other Social Media Links</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={newSocialLink}
                  onChange={(e) => setNewSocialLink(e.target.value)}
                  placeholder="Add a social media link"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("socialMediaLinks", newSocialLink);
                      setNewSocialLink("");
                    }
                  }}
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    addArrayItem("socialMediaLinks", newSocialLink);
                    setNewSocialLink("");
                  }}
                  className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 mt-3">
                {formData.socialMediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex-1 truncate"
                    >
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeArrayItem("socialMediaLinks", index)}
                      className="ml-2 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-secondary bg-gradient-primary hover:shadow-glow transition-spring text-lg px-12 py-3 h-auto font-semibold rounded-lg"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
