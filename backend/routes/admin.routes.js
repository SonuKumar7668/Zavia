const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
const verifyToken = require("../middlewares/verifyToken");
//const asyncWrap = require("../middlewares/asyncWrap");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/mentors/:status",verifyToken,verifyAdmin,async (req,res)=>{
    let status = req.params.status;
    let {mentorId} = req.body;
    if(!mentorId){
        return res.status(400).json({msg:"Please provide mentorId"});
    }
    let mentor = await mentorModel.findById(mentorId);
    if(!mentor){
        return res.status(404).json({msg:"Mentor not found"});
    }
    mentor.status = status;
    await mentor.save();
    return res.status(200).json({msg:"Mentor approved successfully"});
});

router.get("/mentors/pending/:status",(req,res)=>{
    let status = req.params.status;
    mentorModel.find({status:status}).then((mentors)=>{
        return res.status(200).json(mentors);
    }).catch((err)=>{
        return res.status(500).json({msg:"Internal server error"});
    });
})

router.get("/mentors/:id",(req,res)=>{
    let id = req.params.id;
    mentorModel.findById(id).then((mentor)=>{
        if(!mentor){
            return res.status(404).json({msg:"Mentor not found"});
        }
        return res.status(200).json(mentor);
    }).catch((err)=>{
        return res.status(500).json({msg:"Internal server error"});
    });
})

module.exports = router;