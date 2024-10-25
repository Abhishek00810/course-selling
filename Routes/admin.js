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
    const { Email, Password, Firstname, Lastname } = req.body;
    console.log("Signup called")
    bcrypt.hash(Password, saltRounds,async function(err, hash){
        try
        {
            await adminModel.create({
                email: Email,
                password: hash,
                firstName: Firstname,
                lastName: Lastname
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
        console.log(user);
        const result = bcrypt.compare(password, user.password);
        if(result)
        {
            req.session.user = { email };
            console.log(user.firstName);
            res.json({
                message: "Login successfully",
                adminId: user._id,
                adminName: user.firstName
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
    console.log(req.session);
})

adminRouter.post('/course', async function(req, res){
    const {title, description, price, imageUrl, courseType} = req.body;
    const {adminid} = req.headers;
    console.log(adminid);
    if(adminid)
    {
        try{
            await courseModel.create({
                title: title,
                description: description,
                price: price, 
                imageUrl: imageUrl,
                creatorId: adminid,
                courseType: courseType
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

adminRouter.post('/deletecourse', async function(req, res)
{
    const {courseId} = req.body;
    try{
        const course = await courseModel.deleteOne({_id: courseId});
        res.json({
            message:"Deleted"
        })
        console.log(course);
        console.log("Document deleted: ", course);
    }catch(e){
        res.json({
            message:"Error"
        })
        console.log("Error while deleting: ", e);
    }

})


adminRouter.put('/course', adminMiddleware, async function(req, res) {
    const { title, description, price, imageUrl, courseId } = req.body;
    const { adminid } = req.headers;

    try {
        const result = await courseModel.updateOne(
            { _id: courseId, creatorId: adminid },
            { $set: { title, description, price, imageUrl } }  // Use `$set` to update fields
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found or admin not authorized" });
        }

        console.log(result.matchedCount);
        res.json({ message: "Updated", courseId });
    } catch (error) {
        console.error("Update error:", error);  // Log the error for debugging
        res.status(500).json({ message: "Invalid admin", adminId: adminid });
    }
});



module.exports = {
    adminRouter: adminRouter
}


