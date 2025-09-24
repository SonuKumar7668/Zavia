const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
//const verifyToken = require("../utils/verifyToken");

router.get("/",async (req,res)=>{
    console.log("Fetching all mentors");
    let mentors = await mentorModel.find();
    return res.status(200).json(mentors);
});

router.get("/:id",async(req,res)=>{
    let mentor = await mentorModel.findById(req.params.id);
    if(!mentor){
        return res.status(404).json({message:"Mentor not found"});
    }
    return res.status(200).json(mentor);
})

module.exports = router;