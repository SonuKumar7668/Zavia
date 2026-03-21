const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Job Details
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },
    workMode: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "On-site",
    },

    // Salary
    salary: {
      type: Number,
    },

    // Skills & Requirements
    skillsRequired: [
      {
        type: String,
      },
    ],
    experienceRequired: {
      type: String, // e.g. "0-2 years", "3+ years"
    },
    educationRequired: {
      type: String,
    },

    // Application Handling
    applicationDeadline: {
      type: Date,
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["applied", "shortlisted", "rejected", "hired"],
          default: "applied",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Posted By (Admin / Employer)
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Admin" if separate model
      required: true,
    },

    // Metadata
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },

    // Optional Enhancements
    perks: [String],
    companyLogo: String,
    applyLink: String, // external apply option
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);