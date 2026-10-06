import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose Connected")
    }catch(error){
        console.error("Mongoose Connection Failed",error.message);
        process.exit(1);
    }
};

export default connectDB;