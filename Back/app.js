const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
require("dotenv").config(); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// --- DEBUGGING ---
console.log("Loading Environment Variables...");
if (!process.env.MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in .env file");
  process.exit(1); 
}
// -----------------

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const internshipOfferRoutes = require("./routes/internshipOfferRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const quizQuestionRoutes = require("./routes/quizQuestionRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");
const workshopRoutes = require("./routes/workshopRoutes");

const app = express();

// --- MIDDLEWARE START ---

// 1. CORS Configuration (The Fix)
// We must explicitly allow localhost:5173 and enable credentials
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite Frontend URL
  credentials: true,               // Allow cookies/tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// 2. Body Parsing
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload());

// (Removed the manual app.use headers middleware here to avoid conflicts)

// --- MIDDLEWARE END ---

app.post('/upload', function(req, res) {
  if (!req.files || !req.files.foo) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log(req.files.foo); 
  res.send('File uploaded!');
});

// Routes
app.use("/users", userRoutes);
app.use("/internshipOffers", internshipOfferRoutes);
app.use("/applications", applicationRoutes);
app.use("/quizQuestions", quizQuestionRoutes);
app.use("/quizResults", quizResultRoutes);
app.use("/workshops", workshopRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 4890;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));