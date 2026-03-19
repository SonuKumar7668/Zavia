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
const upload = multer();
const cloudinary = require("../config/cloudinary");
const {pdfParse} = require("pdf-parse");
const verifyToken = require("../middlewares/verifyToken");

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
    res.status(201).json("password changed");
})

router.put(
  "/update-profile",
  verifyToken,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      /* ===========================
         1️⃣ Handle Profile Image
      =========================== */
      if (req.files?.profileImage) {
        const imageFile = req.files.profileImage[0];

        const uploadedImage = await cloudinary.uploader.upload_stream(
          {
            folder: "zavia/profile-images",
            resource_type: "image",
          },
          async (error, result) => {
            if (error) throw error;
            user.profileImage = result.secure_url;
            await user.save();
          }
        );

        uploadedImage.end(imageFile.buffer);
      }

      /* ===========================
         2️⃣ Handle Resume PDF
      =========================== */
      if (req.files?.resume) {
        const resumeFile = req.files.resume[0];

        // Upload PDF to Cloudinary
        const uploadedResume = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "zavia/resumes",
              resource_type: "raw", // important for PDFs
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(resumeFile.buffer);
        });

        // Extract text from PDF
        const parsed = await pdfParse(resumeFile.buffer);

        user.resume = {
          url: uploadedResume.secure_url,
          extractedText: parsed.text,
          uploadedAt: new Date(),
        };
      }

      /* ===========================
         3️⃣ Update Text Fields
      =========================== */

      const {
        headline,
        location,
        bio,
        skills,
        experience,
        education,
        jobPreferences
      } = req.body;

      if (headline) user.headline = headline;
      if (location) user.location = location;
      if (bio) user.bio = bio;

      if (skills) {
        user.skills = JSON.parse(skills);
      }

      if (experience) {
        user.experience = JSON.parse(experience);
      }

      if (education) {
        user.education = JSON.parse(education);
      }

      if (jobPreferences) {
        user.jobPreferences = JSON.parse(jobPreferences);
      }

      await user.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        user,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Profile update failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;