const mongoose = require("mongoose");
const { Schema } = mongoose;
//Session Detail	Id	TimeMentor Id	Mentee Id	Room Id	Review

const sessionSchema = new Schema({
    mentorId:{
        type:Schema.Types.ObjectId,
        ref:"Mentor"
    },
    menteeId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    roomId:String,
    review:{
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
    time:Date,
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;