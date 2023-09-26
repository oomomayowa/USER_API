const express = require("express");
const app =express();
require("dotenv").config()
const cors = require("cors")
const uerRouter = require("./routes/user.route")
const mongoose = require("mongoose")


const PORT = process.env.PORT
const URI =process.env.MONGO_URI

mongoose.connect(URI)
.then(()=>{
        console.log("mongoose has connected");
})
.catch((err)=>{
        console.log("mongoose no gree connect");
        console.log(err);
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
app.use("/user",uerRouter)


app.listen(PORT,()=>{
        console.log("app has started");
})
