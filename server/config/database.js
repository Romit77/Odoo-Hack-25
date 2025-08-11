import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Romit:romitok@cluster0.wzr19oi.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message || "Error connecting to MongoDB");
    process.exit(1);
  }
}
