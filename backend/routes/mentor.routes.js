const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
const verifyToken = require("../middlewares/verifyToken");
//const verifyToken = require("../utils/verifyToken");

router.get("/",async (req,res)=>{
    const {search} = req.query;
    if(search){
        let mentors = await mentorModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { skills: { $regex: search, $options: 'i' } },
                { bio: { $regex: search, $options: 'i' } },
                { profession: { $regex: search, $options: 'i' } },
                { language: { $regex: search, $options: 'i' } },
                { country: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } },
            ]
        });
        return res.status(200).json(mentors);
    }
    let mentors = await mentorModel.find();
    return res.status(200).json(mentors);
});

router.get("/me",verifyToken,async(req,res)=>{
    let mentor = await mentorModel.findOne({userId:req.user.id});
    if(!mentor){
        return res.status(404).json({message:"Mentor not found"});
    }
    return res.status(200).json({mentorId:mentor._id});
})

router.get("/:id",async(req,res)=>{
    let mentor = await mentorModel.findById(req.params.id);
    if(!mentor){
        return res.status(404).json({message:"Mentor not found"});
    }
    return res.status(200).json(mentor);
})

router.get("/dashboard/:id",async(req,res)=>{
    let mentor = await mentorModel.findById(req.params.id);
    if(!mentor){
        return res.status(404).json({message:"Mentor not found"});
    }
    return res.status(200).json(mentor);
})

router.put("/profile/edit/:id",verifyToken,async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    await mentorModel.findByIdAndUpdate(id,data);
    res.status(201).json({message:"Edit mentor profile",});
})

module.exports = router;