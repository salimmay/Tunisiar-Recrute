const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a single user by ID
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Get users by role
const getRole = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a user by email
const getEmail = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required for verification." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "User successfully deleted" });
  } catch (err) {
    console.error("Error deleting user:", err.message); // Log the exact error message
    console.error("Stack trace:", err.stack); // Log the stack trace for detailed debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// Update a user by ID
const updateUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, role, password, supervisedInterns } = req.body;

  let updatedInfo = {
    email,
    firstname,
    lastname,
    role,
    supervisedInterns
  };
  // If password is provided, hash it and add to the update info
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedInfo.password = hashedPassword;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedInfo },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err.message); 
    console.error("Stack trace:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new user
const setUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use!" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User successfully saved" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid email or password.");
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.send({ token, role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  setUser,
  getRole,
  loginUser,
  getEmail,
};
