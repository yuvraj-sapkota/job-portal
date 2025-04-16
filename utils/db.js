const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo db is connected successfully");
  } catch (error) {
    console.log("Failed to connect to mongodb", error);
  }
};

module.exports = connectDB;
