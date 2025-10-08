const express = require('express');
const router = express.Router();
const sessionModel = require('../models/sessionModel');
const mentorModel = require('../models/mentorModel');
const reviewModel = require('../models/reviewModel');
const verifyToken = require('../middlewares/verifyToken');
const {nanoid} = require('nanoid');

router.get("/",async (req,res)=>{
    const sessions = await sessionModel.find();
    return res.status(200).json({success:true,sessions});
})

router.get("/check/:id",verifyToken,async (req,res)=>{
    const mentorId = req.params.id;
    const menteeId = req.user.id;
    const session = await sessionModel.find({mentorId,menteeId}).populate('mentorId');
    const upcomingSession = await sessionModel.find({mentorId,menteeId,status:"upcoming"});
    let booked = false;
    if(upcomingSession.length > 0){
        booked = true;
    }

    return res.status(200).json({success:true,booked,session});
});

router.post("/create",verifyToken,async (req,res)=>{
    const {mentorId} = req.body;
    const menteeId = req.user.id;
    // const mentor = await mentorModel.findById(mentorId);
    // if(menteeId === mentor.userId.toString()){
    //     return res.status(400).json({success:false,message:"You cannot create session with yourself"});
    // }
    let newSession = new sessionModel({
        mentorId,
        menteeId,
        roomId:nanoid(),
        status:"upcoming",
    });
    await newSession.save();
    return res.status(200).json({success:true,session:newSession});
});

router.post("/cancel",verifyToken,async (req,res)=>{
    console.log("canceling session");
    const {sessionId} = req.body;
    const menteeId = req.user.id;
    const session = await sessionModel.findById(sessionId);
    if(!session){
        return res.status(404).json({success:false,message:"Session not found"});
    }
    if(session.menteeId.toString() !== menteeId){
        return res.status(403).json({success:false,message:"You are not authorized to cancle this session"});
    }
    if(session.status !== "upcoming"){
        return res.status(400).json({success:false,message:"You can only cancle upcoming sessions"});
    }
    session.status = "cancled";
    await session.save();
    return res.status(200).json({success:true,message:"Session canclled successfully"});
});

router.get("/:id",verifyToken,async (req,res)=>{
    const sessionId = req.params.id;
    const userId = req.user.id;
    const session = await sessionModel.findById(sessionId);
    if(!session){
        return res.status(404).json({success:false,message:"Session not found"});
    }
    if(session.menteeId.toString() !== userId){
        return res.status(403).json({success:false,message:"You are not authorized to view this session"});
    }
    return res.status(200).json({success:true,session});
});

router.post("/feedback/submit",verifyToken,async (req,res)=>{
    console.log(req.body);
    const {rating,feedback,sessionId} = req.body;
    const userId = req.user.id;
    const session = await sessionModel.findById(sessionId);
    if(!session){
        return res.status(404).json({success:false,message:"Session not found"});
    }
    if(session.menteeId.toString() !== userId){
        return res.status(403).json({success:false,message:"You are not authorized to give feedback for this session"});
    }
    let newReview = new reviewModel({
        rating,
        feedback,
        sessionId
    });
    session.review = newReview._id;
    await newReview.save();
    await session.save();
    return res.status(200).json({success:true,message:"Feedback submitted successfully"});
})

module.exports = router;