// Importing all external dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importing all internal dependencies
const dbConnect = require("./config/database");

const authRoutes = require("./routes/Auth");

// Adding body parser middleware
app.use(express.json());

//middleware for parsing cookie
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Defining the port
const PORT = process.env.PORT || 4000;

// Calling the connection function
dbConnect();

//routes
app.use('/api/auth',authRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("<h1>HomePage</h1>");
});

// Initiating App
app.listen(PORT, () => {
  console.log(`App is started at ${PORT}`);
});


