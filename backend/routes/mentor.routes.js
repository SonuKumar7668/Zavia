const express = require("express");
const router = express.Router();
const mentorModel = require("../models/mentorModel");
//const verifyToken = require("../utils/verifyToken");

router.get("/",async (req,res)=>{
    let mentors = await mentorModel.find({status:"approved"});
    return res.status(200).json(mentors);
});

module.exports = router;