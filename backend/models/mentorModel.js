const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentorSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    bio:String,
    country:String,
    state:String,
    city:String,
    profileImg:String,
    language:[String],
    skills:[String],
    meetingCharge:Number,
    availability:String,
    status:String,
    linkedInURL:String,
    gender:{
        type:String,
        enums:["male","female","other"]
    },
    highestEducation:String,
    workExperience:String,
    currentJob:String,
    socialMediaLinks:[String],
}, { timestamps: true });

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;