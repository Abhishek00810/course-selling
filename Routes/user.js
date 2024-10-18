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
    const { Email, Password, Firstname, Lastname } = req.body;
    console.log(req.body)
    bcrypt.hash(Password, saltRounds, async function (err, hash) {
        try {
            await userModel.create({
                email: Email,
                password: hash,
                firstName: Firstname,
                lastName: Lastname
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

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });


        if (!user) {
            return res.status(403).json({
                message: "Invalid email"
            });
        }
 
        const result = await bcrypt.compare(password, user.password);
        console.log(result)

        if (result) {
            req.session.user = { 
                email: user.email,
                userId: user._id,
                firstName: user.firstName
            };
            res.json({
                username: user.firstName,
                userId: user._id,
                message: "Login successful"
            });
        } else {
            // If the password does not match, send an error response
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error during login:", error);
        res.status(500).json({
            message: "An error occurred during login"
        });
    }
 });
 

 userRouter.post('/authorized', async function(req, res) {
    const Email = req.body.email;
    try {
        // Try to find or create a user by email
        userModel.findOrCreate({ email: Email }, async (err, user, created) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error finding or creating user" });
            }

            console.log(Email); // For debugging
            const Firstname = req.body.userName;
            const Lastname = req.body.lastName;
            if (created) {


                user.firstName = Firstname;
                user.lastName = Lastname;
                try {
                    await user.save();
                    req.session.user = { 
                        email: Email,
                        userId: user._id,
                        firstName: user.firstName
                    };
                    return res.json({
                        username: user.firstName,
                        userId: user._id,
                        message: "Login successful"
                    });
                } catch (saveError) {
                    console.error(saveError);
                    return res.status(500).json({ message: "Error saving user information" });
                }
            } else {
                // User already existed, return login success message
                req.session.user = { 
                    email: Email,
                    userId: user._id,
                    firstName: user.firstName
                };
                return res.json({
                    username: user.firstName,
                    userId: user._id,
                    message: "Login successful"
                });
            }
        });
    } catch (outerErr) {
        // Catch any other errors outside of the callback
        console.error(outerErr);
        return res.status(500).json({ message: "Internal server error" });
    }
});


userRouter.post('/purchase', userMiddleware, async function (req, res) {
    console.log(req.session)
    if(req.session.user)
    {
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


userRouter.post('/purchaseid', async function (req, res) {
    console.log(req.body)
    console.log("Purchased api called")
        const userId = req.body.userId;
        if(!userId)        
            {
                res.status(500).json({
                    message: "An error occurred during loading"
                });
            } 
        
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
)

module.exports = {
    userRouter: userRouter
}