// Importing external dependiencies
const mongoose = require("mongoose");
require("dotenv").config();

// Importing the MongoDB URL
const DB_URL = process.env.DB_URL;

// Defining Mongoose connection function
const dbConnect = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((error) => {
      console.log("Error in DB Connection:", error);
      process.exit(1);
    });
};

// Exporting connection function
module.exports = dbConnect;
