const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  Credentials: true,
};

app.use(cors(corsOption));

const connectDB = require("./utils/db");
const userRouter = require("./routes/UserRoute");

connectDB();

app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the port number ${process.env.PORT}`);
});
