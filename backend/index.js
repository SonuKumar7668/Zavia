const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const bodyParser = require("body-parser");
require('dotenv').config();
const url = process.env.DB_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/",(req,res)=>{
    res.send("Server started");
})

app.listen(port,async()=>{
    console.log(`app is listening at -> ${port}`);
    console.log("Connecting with Database");
    await mongoose.connect(url).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})