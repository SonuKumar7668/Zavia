const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
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

module.exports = router;