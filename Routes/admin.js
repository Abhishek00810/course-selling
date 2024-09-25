const {Router} = require('express')
const { userModel, adminModel, courseModel, purchaseModel } = require('../db.js')
const {adminMiddleware} = require('../Middleware/admin.js')
const adminRouter = Router();
const jwt = require('jsonwebtoken')
const session = require('express-session')
const JWT_PASSWORD = "This is Abhishek admin";
const saltRounds = 10;
const bcrypt = require('bcrypt');

adminRouter.use(adminMiddleware)
adminRouter.post('/signup', async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    bcrypt.hash(password, saltRounds,async function(err, hash){
        try
        {
            await adminModel.create({
                email: email,
                password: hash,
                firstName: firstName,
                lastName: lastName
            })
            res.json({
                message: "Signed up succeed"
            })
        }
        catch(e)
        {
            res.send("failed")
            console.log(e)
        }
    })
})


adminRouter.post('/signin', async function(req, res){
    const {email, password} = req.body;
    try
    {
        const user = await adminModel.findOne({
            email: email, 
        })
        const result = bcrypt.compare(password, user.password);
        if(result)
        {
            req.session.user = { email };
            res.json({
                message: "Login successfully"
            })
        }
        else
        {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }
    }   
    catch{
        res.json({
            message: "Invalid transaction"
        })
    }
})

adminRouter.post('/course', async function(req, res){
    const {title, description, price, imageUrl} = req.body;
    const creatorId = req.adminId;

    if(req.session.user)
    {
        try{
            await courseModel.create({
                title: title,
                description: description,
                price: price, 
                imageUrl: imageUrl,
                creatorId: creatorId
            })
            res.json({
                message: "Course created"
            })
        }
        catch{
            res.json({
                message: "Invalid actions"
            })
        }
    }
    else {
        res.json({
            message: "Not login"
        })
    }
})


adminRouter.put('/course', adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title, description, price, imageUrl, courseId} = req.body;


    try{
        const course = await adminModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
        })  
        res.json({
            message: "Updated",
            courseId: course._id
        })
    }
    catch{
        res.json({
            message: "Invalid admin",
            adminId: adminId
        })
    }
})



module.exports = {
    adminRouter: adminRouter
}


