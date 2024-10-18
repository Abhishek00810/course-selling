const jwt = require("jsonwebtoken");
const express = require('express')
const session = require('express-session')
const JWT_PASSWORD = "This is Abhishek admin";
const app = express();
app.use(express.json());
require('dotenv').config()


const userMiddleware = session({
    secret: process.env.ADMINPASSWORD,
    resave: false,
    saveUninitialized: false, // Create sessions only when data is added to them
    cookie: {
      httpOnly: true,
      secure: false, // Set to true when using HTTPS
      maxAge: 60000000,  // 1 minute expiration
      sameSite: 'none'
    }
  });

module.exports = {
    userMiddleware: userMiddleware
}