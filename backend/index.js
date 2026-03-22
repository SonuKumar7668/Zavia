const express = require("express");
const app = express();
const {Server} = require("socket.io");
const {createServer} = require("node:http");
const server = createServer(app);
const connectServer = require("./controller/socketManager");
const io = connectServer(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const url = process.env.DB_URL;
const port = process.env.PORT ||8080;
const morgan = require("morgan");
app.use(cors());

const userRoutes = require("./routes/user.routes");
const mentorRoutes = require("./routes/mentor.routes");
const adminRoutes = require("./routes/admin.routes");
const sessionRoutes = require("./routes/session.routes");
const chatRoutes = require("./routes/chat.routes");
const jobRoutes = require("./routes/job.routes");
const verifyToken = require("./middlewares/verifyToken");

const mentorModel = require("./models/mentorModel");
const jobModel = require("./models/jobModel");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded());

app.get("/",(req,res)=>{
    const threeMentors = mentorModel.find().select("name currentJob").limit(3);
    const threeJobs = jobModel.find().select("title company location").limit(3);
    Promise.all([threeMentors,threeJobs]).then(([mentors,jobs])=>{
        return res.status(200).json({mentors,jobs});
    }).catch((err)=>{
        return res.status(500).json({message:"Error fetching data",error:err});
    });
})

app.get("/verifyToken",verifyToken,(req,res)=>{
    return res.status(200).json({token:true,user:req.user});
});

app.use("/user",userRoutes);
app.use("/admin",adminRoutes);
app.use("/mentor",mentorRoutes);
app.use("/session",sessionRoutes);
app.use("/chat",chatRoutes);
app.use("/jobs",jobRoutes);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

server.listen(port,async()=>{
    console.log(`app is listening at -> ${port}`);
    console.log("Connecting with Database");
    await mongoose.connect(url).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})