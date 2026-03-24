const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", async (req,res)=>{
    try{
        const { location, jobType } = req.query;
        let filter = {};
        if(location) filter.location = location;
        if(jobType) filter.jobType = jobType;
        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.json({ jobs });

        // const jobs = await Job.find();
        // res.json({ jobs });
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({message: "Job not found"});
        res.json({ job });
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post("/",verifyToken,verifyAdmin, async (req, res) => {
    try {
        const { title, company, location, jobType, workMode, skillsRequired, description,salary,experienceRequired, educationRequired, applicationDeadline } = req.body;
        const userid = req.user.id;
        const newJob = new Job({
            title,
            company,
            location,
            jobType,
            workMode,
            skillsRequired,
            experienceRequired,
            educationRequired,
            applicationDeadline,
            description,
            salary,
            postedBy: userid,
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put("/:id",verifyToken,verifyAdmin, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        const { title, company, location, jobType, workMode, skillsRequired, description,salary,experienceRequired, educationRequired, applicationDeadline } = req.body;
        job.title = title || job.title;
        job.company = company || job.company;
        job.location = location || job.location;
        job.jobType = jobType || job.jobType;
        job.workMode = workMode || job.workMode;
        job.skillsRequired = skillsRequired || job.skillsRequired;
        job.experienceRequired = experienceRequired || job.experienceRequired;
        job.educationRequired = educationRequired || job.educationRequired;
        job.applicationDeadline = applicationDeadline || job.applicationDeadline;
        job.description = description || job.description;
        job.salary = salary || job.salary;
        await job.save();
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete("/:id",verifyToken,verifyAdmin, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        const deletedJob = await job.deleteOne();
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/user/apply", verifyToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const appliedJobs = await User.findById(userId).populate("applications");
        const jobs = appliedJobs.applications || [];
        console.log("Applied Jobs:", jobs);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/user/save", verifyToken, async (req, res) => {
    try {
        console.log("Fetching saved jobs for user ID:", req.user.id);
        const userId = req.user.id;
        console.log("User ID for saved jobs:", userId);
        const savedJobs = await User.findById(userId).populate("savedJobs");
        const jobs = savedJobs.savedJobs || [];
        console.log("Saved Jobs:", jobs);
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        res.status(500).json({ message: error.message });
    }
})

router.post("/apply", verifyToken, async (req, res) => {
    try {
        const job = await Job.findById(req.body.jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });
        const userId = req.user.id;
        if (job.applicants.some(applicant => applicant.user.toString() === userId)) {
            return res.status(400).json({ message: "Already applied to this job" });
        }
        job.applicants.push({ user: userId, status: "applied" });
        await job.save();
        const user = await User.findById(userId);
        user.applications.push(job._id);
        await user.save();
        res.json({ message: "Applied successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/save", verifyToken, async (req, res) => {
    try {
        const job = await Job.findById(req.body.jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });
        const userId = req.user.id;
        if (job.savedBy.includes(userId)) {
            job.savedBy = job.savedBy.filter(id => id.toString() !== userId);
        } else {
            job.savedBy.push(userId);
        }
        await job.save();
        const user = await User.findById(userId);
        if (user.savedJobs.includes(job._id)) {
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== job._id.toString());
        } else {
            user.savedJobs.push(job._id);
        }
        await user.save();
        res.json({ message: "Job saved/unsaved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;