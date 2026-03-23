const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const mentorModel = require("../models/mentorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const varifyToken = require("../middlewares/verifyToken");
const asyncWrap = require("../middlewares/asyncWrap");
const salt = 10;
const multer = require("multer");
const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");
const {pdfParse} = require("pdf-parse");
const verifyToken = require("../middlewares/verifyToken");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

router.get("/profile",verifyToken,async (req,res)=>{
    let userId = req.user.id;
    let user = await userModel.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({msg:"User not found"});
    }
    res.status(200).json({user});
});

router.put("/profile",verifyToken,async (req,res)=>{
try {
    const userId = req.user.id; // from JWT middleware
    console.log("user data",req.body);
    // Extract only allowed fields
    const allowedUpdates = {
      name: req.body.name,
      location: req.body.location,
      careerSummary: req.body.careerSummary,
      jobPreferences: req.body.jobPreferences,
      skills: req.body.skills,
      experience: req.body.experience,
      education: req.body.education,
      projects: req.body.projects,
      socialLinks: req.body.socialLinks,
      openToWork: req.body.openToWork,
    };

    // Remove undefined fields (IMPORTANT)
    Object.keys(allowedUpdates).forEach(
      (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key]
    );

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    // Optional: recalculate profile completion
    const completionFields = [
      "name",
      "location",
      "bio",
      "skills",
      "experience",
      "education",
      "projects",
    ];

    const filled = completionFields.filter(
      (field) =>
        updatedUser[field] &&
        (Array.isArray(updatedUser[field])
          ? updatedUser[field].length > 0
          : true)
    ).length;

    updatedUser.profileCompletion = Math.round(
      (filled / completionFields.length) * 100
    );

    await updatedUser.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})

// Register User
router.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({msg:"Please enter all fields"});
    }
    let user = await userModel.findOne({email});
    if(user){
        return res.status(400).json({msg:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new userModel({name, email, password:hashedPassword});
    await user.save();
    res.status(201).json({msg:"User registered successfully"});
    // res.redirect('/login');
})

// Login User
router.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({msg:"Please enter all fields"});
    }
    let user =await userModel.findOne({email});
    if(!user){
        return res.status(400).json({msg:"User does not exist"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({msg:"Invalid credentials"});
    }
    const token = jwt.sign({id:user._id,role:user.role,name:user.name},JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({success:"true",token});
})

// Mentor Request
router.post("/mentor/create",varifyToken,async (req,res)=>{
    let data = req.body;
    let newMentor = new mentorModel(data);
    let userId = req.user.id;
    newMentor.userId = userId;
    newMentor.status = "pending";
    let user = await userModel.findById(userId);
    user.role = "mentor";
    await user.save();
    await newMentor.save();
    return res.status(200).json({msg:"Mentor request received"});
})

router.put("/forgotpassword",async (req,res)=>{
    let {email,password} = req.body;
    let user =await userModel.findOne({email});
    if(!user){
        console.log("not exist");
        return res.status(404).json({message:"Email does not exist"});
    }
    const hashedPassword = await bcrypt.hash(password,salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "Password changed successfully" });
})

router.post(
  "/resume/upload",
  verifyToken,
  upload.single("resume"),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);
      console.log("Cloudinary result:", result);
      // Delete old resume if exists
      if (user.resume?.public_id) {
        await cloudinary.uploader.destroy(user.resume.public_id, {
          resource_type: "raw",
        });
      }

      user.resume = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      await user.save();

      res.json({
        message: "Resume uploaded successfully",
        resume: user.resume,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  }
);

module.exports = router;