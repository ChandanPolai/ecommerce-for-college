import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MongoDB connection string is missing. Please define MONGODB_URI or MONGO_URI in your .env file.");
  }

  // Use MONGODB_URI with '/e-commerce' appended if defined (preserving original behavior),
  // otherwise fallback to MONGO_URI directly.
  const connectionString = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/e-commerce` : process.env.MONGO_URI;

  await mongoose.connect(connectionString);
};

export default connectDB;
