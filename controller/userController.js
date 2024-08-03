const express = require('express');
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const session = require("express-session");



const checkUser = asyncHandler(async(req,res) => {
  if (req.session.user) {
    console.log(req.session.user);
    res.json(req.session.user);
  } else {
    res.status(401).send('Not authenticated');
  }
})

const registerUser = asyncHandler(async(req,res) => {
    const { username,email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }
  
    // Check if user email already exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("Email has already been registered");
    }
  
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
  
    // //   Generate Token
    // const token = generateToken(user._id);
  
    // // Send HTTP-only cookie
    // res.cookie("token", token, {
    //   path: "/",
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //   sameSite: "none",
    //   secure: true,
    // });
  
    if (user) {
      const { _id, username, email} = user;
      res.status(201).json({
        _id,
        username,
        email,
        role
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
  
    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
  
//     //   Generate Token
//     const token = generateToken(user._id);
    
//     if(passwordIsCorrect){
//      // Send HTTP-only cookie
//     res.cookie("token", token, {
//       path: "/",
//       httpOnly: true,
//       expires: new Date(Date.now() + 1000 * 86400), // 1 day
//       sameSite: "none",
//       secure: true,
//     });
//   }

    if (user && passwordIsCorrect) {
    req.session.user = { id: user._id, username: user.username, role: user.role };
    console.log(req.session.user);
      const { _id, username, email,role } = user;
      res.status(200).json({
        _id,
        username,
        email,
        role
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  });

 

const logoutUser = asyncHandler(async(req,res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
})




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkUser
}
