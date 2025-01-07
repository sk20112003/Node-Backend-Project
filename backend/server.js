import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userroute from "./routes/user.route.js"


dotenv.config();
const app =express();
const PORT= process.env.PORT || 4051;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" ,authRoute);
app.use("/api/users" ,userroute);

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
    connectDB()
})