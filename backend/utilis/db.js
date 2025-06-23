import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
         console.log('MongoDB Connected');
    } catch (error) {
         console.error(error);
    }
}

export default connectDB;