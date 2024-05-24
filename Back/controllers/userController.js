const asyncHandler = require('express-async-handler');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const express = require('express');

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
const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) return res.status(404).send('User not found.');
      res.send(user);
    } catch (error) {
      res.status(500).send('Server error.');
    }
  };
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
        const user = await User.findOne({ email: req.params.email });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: "User successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a user by ID
const updateUser = asyncHandler(async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updatedInfo = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        password: hashedPassword,
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updatedInfo }, { new: true });
        res.json(updatedUser);
    } catch (err) {
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
        return res.status(400).send('Invalid email or password.');
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ token });
    } catch (error) {
      res.status(500).send('Server error.');
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
    getEmail
};
