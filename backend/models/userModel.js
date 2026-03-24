const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ========================
   Sub Schemas
======================== */

// Experience
const experienceSchema = new Schema({
    role: String,
    company: String,
    duration: String,
    description: String,
}, { _id: false });

// Education
const educationSchema = new Schema({
    degree: String,
    institute: String,
    year: String,
    grade: String,
}, { _id: false });

// Resume
const resumeSchema = new Schema({
    url: String,              // S3 URL
    public_id: String,   // Cloudinary public ID
    uploadedAt: {
        type: Date,
        default: Date.now
    },
}, { _id: false });

// Project
const projectSchema = new Schema({
    title: String,
    description: String,
    techStack: [String],
    liveLink: String,
    githubLink: String,
}, { _id: false });


// Job Application Tracker
const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job"
    },
    status: {
        type: String,
        enum: ["applied", "shortlisted", "interview", "offer", "rejected"],
        default: "applied"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });


/* ========================
   Main User Schema
======================== */

const userSchema = new Schema({

    /* ---------- Authentication ---------- */
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: String,

    role: {
        type: String,
        enum: ["mentee", "mentor", "admin"],
        default: "mentee"
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    /* ---------- Professional Identity (Job Seeker) ---------- */
    headline: String,       // "Aspiring Frontend Developer"
    location: String,
    bio: String,

    skills: [{
        name: String,
        level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"]
        }
    }],

    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema],

    /* ---------- Resume ---------- */
    resume: resumeSchema,

    /* ---------- Job Preferences ---------- */
    jobPreferences: {
        roles: [String],
        locations: [String],
        salaryRange: {
            min: Number,
            max: Number
        },
        remoteOnly: Boolean
    },

    /* ---------- Applications ---------- */
    applications: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }],

    /* ---------- Platform Stats ---------- */
    profileCompletion: {
        type: Number,
        default: 0
    },

    savedJobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;