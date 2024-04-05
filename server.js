const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }
};
connectDb();
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let message;
  switch (dbStatus) {
    case 0:
      message = "Disconnected";
      break;
    case 1:
      message = "Connected";
      break;
    case 2:
      message = "Connecting";
      break;
    case 3:
      message = "Disconnecting";
      break;
    default:
      message = "Unknown";
  }
  res.send(`Database connection status: ${message}`);
});
app.listen(3000, () => {
  console.log("server running");
});
