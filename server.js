const express = require("express");
const mongoose = require("mongoose");
const { connectDB, checkConnection } = require("./db");
const routes = require("./routes.js");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", routes);
connectDB();
app.listen(port, () => {
  console.log("Running on PORT", port);
});
