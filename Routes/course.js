const {Router} = require('express');
const { courseModel, purchaseModel } = require('../db');
const  {userMiddleware}  = require('../Middleware/user')

const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware ,async function(req, res){
    const userId = req.body.userId;
    const courseId = req.body.courseId
    console.log(userId)
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "you have successfully purchased the course"
    })
})

courseRouter.get('/preview',async function(req, res){
    
    const course = await courseModel.find({});
    res.json({
        course
    })
})

courseRouter.post('/previewadmin',async function(req, res){
    const course = await courseModel.find({creatorId: req.body.adminId});
    res.json({
        course
    })
})

module.exports = {
    courseRouter: courseRouter
}