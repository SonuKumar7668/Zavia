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
    console.log("matched");
    const token = jwt.sign({id:user._id,role:user.role,name:user.name},JWT_SECRET,{expiresIn:"1d"});
    res.status(200).json({success:"true",token});
})

// Mentor Request
router.post("/mentor/create",varifyToken,async (req,res)=>{
    let data = req.body;
    console.log("data: ",data)
    let newMentor = new mentorModel(data);
    let userId = req.user.id;
    newMentor.userId = userId;
    newMentor.status = "pending";
    let user = await userModel.findById(userId);
    user.role = "mentor";
    await user.save();
    console.log("newMentor: ",newMentor);
    await newMentor.save();
    return res.status(200).json({msg:"Mentor request received"});
})

module.exports = router;