const {Router} = require('express');
const { courseModel, purchaseModel } = require('../db');
const  {userMiddleware}  = require('../Middleware/user')

const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware ,async function(req, res){
    const userId = req.userId;
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "you have successfully purchased the course"
    })
})

courseRouter.post('/preview',async function(req, res){
    const course = await courseModel.find({});
    res.json({
        course
    })
})


module.exports = {
    courseRouter: courseRouter
}