const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({

  /* ---------- Basic Job Info ---------- */
  title: {
    type: String,
    required: true,
    trim: true
  },

  companyName: {
    type: String,
    required: true
  },

  companyLogo: String,

  description: {
    type: String,
    required: true
  },

  /* ---------- Location ---------- */
  location: {
    country: String,
    state: String,
    city: String
  },

  workMode: {
    type: String,
    enum: ["remote", "onsite", "hybrid"],
    default: "onsite"
  },

  /* ---------- Employment Details ---------- */
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract"],
    required: true
  },

  experienceLevel: {
    type: String,
    enum: ["fresher", "junior", "mid", "senior"],
    required: true
  },

  /* ---------- Salary ---------- */
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: "INR"
    }
  },

  /* ---------- Skills Required ---------- */
  skillsRequired: [{
    name: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"]
    }
  }],

  /* ---------- Application Tracking ---------- */
  applications: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  applicationCount: {
    type: Number,
    default: 0
  },

  /* ---------- Recruiter / Admin ---------- */
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User" // recruiter or admin
  },

  /* ---------- Status ---------- */
  status: {
    type: String,
    enum: ["open", "closed", "draft"],
    default: "open"
  },

  expiresAt: Date

}, { timestamps: true });

/* ---------- Indexing (Important for Search Performance) ---------- */
jobSchema.index({ title: "text", description: "text", companyName: "text" });
jobSchema.index({ skillsRequired: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ employmentType: 1 });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;