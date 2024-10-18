const passport = require('passport')
const express = require('express');
const GoogleAuth = express.Router();

GoogleAuth.get('/google',
    passport.authenticate('google', {scope:['profile', 'email']})
);

const jwt = require('jsonwebtoken');

GoogleAuth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT token with user info
    const token = jwt.sign({
      name: req.user.name,
      email: req.user.emails,
    }, 'your_jwt_secret_key', { expiresIn: '1h' });

    // Redirect to the frontend with the token
    
    res.redirect(`http://localhost:5173/Home?token=${token}`);
  }
);

  module.exports = GoogleAuth;