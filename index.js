const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session'); 
const {userRouter} = require('./Routes/user')
const {adminRouter} = require('./Routes/admin')
const {courseRouter} = require('./Routes/course')
require('./config/passport')
const authRoutes = require('./Routes/auth');

const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors())
app.use(session({
  secret: 'your-secret-key', // You can use a random strong string
  resave: false, // Prevents session from being saved back to the session store if unmodified
  saveUninitialized: false // Prevents uninitialized sessions from being saved to the session store
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);


async function main()
{
  await mongoose.connect(process.env.MONGODB_URL)
  app.listen(3000);
  console.log("Listening on port 3000");
}


main();