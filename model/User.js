const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
 bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("User", userSchema);

// users
