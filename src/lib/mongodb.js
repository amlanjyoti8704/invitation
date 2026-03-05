import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/invitation`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}