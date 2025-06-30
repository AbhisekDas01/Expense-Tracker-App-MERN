import mongoose from "mongoose";
import {MONGO_URI} from "./env.js";

if(!MONGO_URI){
    throw new Error("MONGO_URI is not present in the .env file");
}

const connectDB = async() => {

    try {
        
        await mongoose.connect(MONGO_URI , {});

        console.log("Connected to the database");
    } catch (error) {
        console.log("Error connection to the DB" , error);
        process.exit(1);
    }
}

export default connectDB;