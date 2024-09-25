const { Router } = require('express')
const { userModel, adminModel, courseModel, purchaseModel } = require('../db.js')
const jwt = require("jsonwebtoken");
const { userMiddleware } = require('../Middleware/user.js');
const userRouter = Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');
const JWT_PASSWORD = "This is Abhishek";
const session = require('express-session')


userRouter.use(userMiddleware)
userRouter.post('/signup', function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
        try {
            await userModel.create({
                email: email,
                password: hash,
                firstName: firstName,
                lastName: lastName
            })
            res.json({
                message: "Signed in successfully"
            })
        }
        catch (e) {
            res.send("failed")
            console.log(e)
        }
    });
})

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;
    try{
        const user = await userModel.findOne({
            email : email
        })
        const result = bcrypt.compare(password, user.password);
            if (result) {
                console.log(user._id);
                req.session.user = {email}
                res.json({
                    message: "Login"
                })
            }
             else {
                res.status(403).json({
                    message: "incorrect credentials"
                })
            }
    }
    catch{
        res.status(403).json({
            message: "Invalid email"
        })
    }
})

userRouter.post('/purchase', userMiddleware, async function (req, res) {
    if(req.session.user)
    {
        console.log(req.session.user)
        const userId = req.userId;
        const purchases = await purchaseModel.find({
            userId,
        })
    
        let purchaseCourse = [];
        for (let i = 0; i < purchases.length; i++) {
            purchaseCourse.push(purchases[i].courseId);
        }
    
        const courseData = await courseModel.find({
            _id: { $in: purchaseCourse }
        })
    
        res.json({
            purchases,
            courseData
        })
    }
    else
    {
        res.json({
            message: "Not login"
        })
    }
})

module.exports = {
    userRouter: userRouter
}