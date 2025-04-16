const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Stirng,
      required: true,
    },
    requirements: [{ type: Strings }],
    title: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: mongose.Schema.Types.ObjectId,
      ref: "Company",
      reqired: true,
    },
    company: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
    application: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
