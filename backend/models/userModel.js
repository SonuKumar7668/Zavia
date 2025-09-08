const mongoose = require("mongoose");
const { Schema } = mongoose;


//Mentee	Id	Language	Profile Img	Name	Email	Password	Skills	Bio	role

const userScheam = new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['mentor','mentee','admin'],
        default:'mentee'
    },
    skills:[String],
}, { timestamps: true });

const User = mongoose.model("User", userScheam);
module.exports = User;