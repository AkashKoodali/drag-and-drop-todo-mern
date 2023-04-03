const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const allRoutes = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: "http://localhost:3000/", //my deployed frontend https://kreddit.vercel.app
  credentials: true,
  ///..other options
};

// middlewares
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", allRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message, stack: err.stack });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
