const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
const verifyToken = require("../middlewares/verifyToken");
//const asyncWrap = require("../middlewares/asyncWrap");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/mentor/:status",verifyToken,verifyAdmin,async (req,res)=>{
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

module.exports = router;