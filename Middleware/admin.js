const jwt = require("jsonwebtoken");
const express = require('express')
const session = require('express-session')
const JWT_PASSWORD = "This is Abhishek admin";
const app = express();
app.use(express.json());
require('dotenv').config()


const adminMiddleware = session({
    secret: process.env.USERPASSWORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60000  
    }
  });

module.exports = {
    adminMiddleware: adminMiddleware
}