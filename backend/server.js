import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/posts.routes.js"
dotenv.config();



const app = express();

app.use(cors());

app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))


const start = async ()=>{
    const connectDB = mongoose.connect("mongodb+srv://kp2037723:kashyap123@cluster0.ntb3r.mongodb.net/");


    app.listen(9080,()=>{
        console.log("app is listening on port 9080");
    })

}
start();