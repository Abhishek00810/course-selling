const express = require('express');
const mongoose = require('mongoose');
const {userRouter} = require('./Routes/user')
const {adminRouter} = require('./Routes/admin')
const {courseRouter} = require('./Routes/course')
require('dotenv').config()
const app = express();
app.use(express.json());

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