//mongodb+srv://dadwalabhishek10:fy3BsTyCdVaH8Wcq@cluster0.vh6s6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose")
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String, 
    lastName: String
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String, 
    lastName: String
})


const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})


const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

userSchema.plugin(findOrCreate);
const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel: userModel, 
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel,
}