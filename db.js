const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://naveennaveen:Naveen123@cluster0.fqerunu.mongodb.net/Movie_Title?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("📦 connected to mongoDB");
  } catch (err) {
    console.error("Error connecting to mongoDB:", err.message);
  }
};
const checkConnection = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = {
  connectDB,
  checkConnection,
};
