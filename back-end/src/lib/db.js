import mongoose from "mongoose";

export const connectDB = async ()=>{
  try {
const conn= await mongoose.connect(process.env.mongodb_url)
console.log("MongoDB connceted "+ `${conn.connection.host}`)
  } catch (error) {
    console.log("MongoDB connection error ",error)
  }
}