const express = require("express");
const app = express();
const {Server} = require("socket.io");
const {createServer} = require("node:http");
const server = createServer(app);
const connectServer = require("./controller/socketManager");
const io = connectServer(server);
const mongoose = require("mongoose");
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const url = process.env.DB_URL;

const userRoutes = require("./routes/user.routes");
const mentorRoutes = require("./routes/mentor.routes");
const adminRoutes = require("./routes/admin.routes");
const sessionRoutes = require("./routes/session.routes");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server started");
})

app.use("/user",userRoutes);
app.use("/admin",adminRoutes);
app.use("/mentor",mentorRoutes);
app.use("/session",sessionRoutes);

server.listen(port,async()=>{
    console.log(`app is listening at -> ${port}`);
    console.log("Connecting with Database");
    await mongoose.connect(url).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})