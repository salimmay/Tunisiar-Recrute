const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const internshipOfferRoutes = require("./routes/internshipOfferRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const quizQuestionRoutes = require('./routes/quizQuestionRoutes');
const quizResultRoutes = require('./routes/quizResultRoutes');
const workshopRoutes = require('./routes/workshopRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/users", userRoutes);
app.use("/internshipOffers", internshipOfferRoutes);
app.use("/applications", applicationRoutes);
app.use('/quizQuestions', quizQuestionRoutes);
app.use('/quizResults', quizResultRoutes);
app.use('/workshops', workshopRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 4890;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
