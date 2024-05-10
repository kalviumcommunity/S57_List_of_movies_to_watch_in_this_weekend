const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const person = mongoose.model("users", user);
module.exports = person;
