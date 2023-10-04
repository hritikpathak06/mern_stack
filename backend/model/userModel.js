const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "name cannot exceed 30 charcaters"],
        minLength: [4, "Name should have more than 4 charcters"]
    },

    email: {
        type: String,
        required: [true, "Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },

    password: {
        type: String,
        required: [true, "Enter Your Pasword"],
        minLength: [8, "Password should have more than 8 charcters"],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    role:{
        type:String,
        default: "User"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

})


// Hashed password
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.SECRET_KEY, {
        expiresIn:"5d"
    })
}


// Compare password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("User",userSchema);