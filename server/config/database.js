import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://Romit:romitok@cluster0.wzr19oi.mongodb.net/turf-booking-app";

    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB - Database: turf-booking-app");
    console.log(
      "MongoDB URI:",
      mongoURI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")
    );
  } catch (err) {
    console.error(
      "MongoDB connection error:",
      err.message || "Error connecting to MongoDB"
    );
    process.exit(1);
  }
}
