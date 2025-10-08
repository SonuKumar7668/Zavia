const mongoose = require("mongoose");
const { Schema } = mongoose;

//Review	Id	Mentor Id	Mentee Id	rating	Feedback	session Id

const reviewSchema = new Schema({
    rating:{
        type:Number,
        min:1,
        max:5
    },
    feedback:String,
    sessionId:{
        type:Schema.Types.ObjectId,
        ref:"Session"
    },
}, { timestamps: true });
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;