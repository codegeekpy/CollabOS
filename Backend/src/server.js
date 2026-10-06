import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;



app.use(cors());

app.use(express.json());

app.use("/projects",projectRoutes);


app.listen(PORT,(req,res)=>{
    console.log("Server is running on Port");
})


app.get("/",(req,res)=>{
    res.json({
        message:"Server is running"
    })
})

connectDB();
