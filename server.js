const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const FileRoutes = require("./Routes/File")

//Server Config
app.listen(5000,()=>{
    console.log("server is Started !");
});
//DB Connection
mongoose.connect(process.env.DB).then(()=>{
    console.log("DB Connected !");
}).catch((err)=>{
    console.log(err);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints
app.use("/api/file",FileRoutes);