const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB, checkConnection } = require("./db");
const routes = require("./routes.js");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors()); // Allow requests from all origins

app.use("/api", routes);
app.get("/ping", (req, res) => {
  res.send("pong");
});
connectDB();
app.listen(port, () => {
  console.log("Running on PORT", port);
});
