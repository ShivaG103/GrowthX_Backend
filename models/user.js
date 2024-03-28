const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeID: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Manager", "Employee", "Intern"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

// Exporting the user Model
module.exports = mongoose.model("user", userSchema);
