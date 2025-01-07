import mongoose from "mongoose";

 const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log("Mongo Db Connected");
    }catch(error){
         console.log(`Error in connecting Db:${error}`)
         process.exit(1)
    }
}

export default connectDB