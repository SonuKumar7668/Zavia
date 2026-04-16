const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
const verifyToken = require("../middlewares/verifyToken");
//const asyncWrap = require("../middlewares/asyncWrap");
const verifyAdmin = require("../middlewares/verifyAdmin");
const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/subscribe", verifyToken, async (req, res) => {
    // This is a placeholder route. In a real application, you would integrate with a payment gateway like Stripe or Razorpay here.
    // For now, we'll just simulate a successful subscription.
    const plan = req.body.plan;
    if (plan !== "admin") {
        return res.status(400).json({ msg: "Invalid plan selected" });
    }
    let user = req.user; // Assuming verifyToken middleware attaches user info to req
    const updatedUser = await userModel.findByIdAndUpdate(user.id, { role: "admin" }, { new: true });
    const token = jwt.sign({ id: user.id, role: updatedUser.role, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
    // Simulate subscription logic (e.g., update user role in database) here
    return res.status(200).json({ msg: "Subscription successful, you are now a recruiter!", token });
});

router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Fetching dashboard for user ID:", userId);
        // Get all jobs posted by recruiter
        const jobs = await jobModel.find({ postedBy: userId })
            .populate("applicants.user", "name email")
            .sort({ createdAt: -1 });

        // KPIs
        console.log("Jobs fetched for dashboard:", jobs);
        const totalJobs = jobs.length;

        const totalApplicants = jobs.reduce(
            (acc, job) => acc + job.applicants.length,
            0
        );

        const totalViews = jobs.reduce((acc, job) => acc + job.views, 0);

        // Recent applicants (flatten + sort)
        let recentApplicants = [];

        jobs.forEach((job) => {
            job.applicants.forEach((app) => {
                recentApplicants.push({
                    jobTitle: job.title,
                    jobId: job._id,
                    ...app.toObject(),
                });
            });
        });

        recentApplicants = recentApplicants
            .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
            .slice(0, 5);

        res.json({
            stats: {
                totalJobs,
                totalApplicants,
                totalViews,
            },
            jobs,
            recentApplicants,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/jobs", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const jobs = await jobModel.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json({ jobs });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/job/:jobId/applications", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const applications = await jobModel.findById(req.params.jobId).populate("applicants.user");
        console.log("Applications for job", req.params.jobId, applications);
        return res.status(200).json({ applications });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.post("/mentors/:status", verifyToken, verifyAdmin, async (req, res) => {
    let status = req.params.status;
    let { mentorId } = req.body;
    if (!mentorId) {
        return res.status(400).json({ msg: "Please provide mentorId" });
    }
    let mentor = await mentorModel.findById(mentorId);
    if (!mentor) {
        return res.status(404).json({ msg: "Mentor not found" });
    }
    mentor.status = status;
    await mentor.save();
    return res.status(200).json({ msg: "Mentor approved successfully" });
});

router.get("/mentors/pending/:status", (req, res) => {
    let status = req.params.status;
    mentorModel.find({ status: status }).then((mentors) => {
        return res.status(200).json(mentors);
    }).catch((err) => {
        return res.status(500).json({ msg: "Internal server error" });
    });
})

router.get("/mentors/:id", (req, res) => {
    let id = req.params.id;
    mentorModel.findById(id).then((mentor) => {
        if (!mentor) {
            return res.status(404).json({ msg: "Mentor not found" });
        }
        return res.status(200).json(mentor);
    }).catch((err) => {
        return res.status(500).json({ msg: "Internal server error" });
    });
})

module.exports = router;