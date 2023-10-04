const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../middleware/sendToken");
const User = require("../model/userModel");

// REGISTER USER
const registerUser = catchAsyncError(async (req, res) => {
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: "This is sample public id",
            url: "this is a sample url"
        }
    })

    sendToken(user,201,res)

})



// LOGIN USER
const loginUser = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;
    // Checking if user has given email and password
    if (!email || !password) {
        res.status(404).json({
            success: false,
            message: "Please enter your email and password"
        })
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(404).json({
            success: false,
            message: " Invalid password"
        })
    }

   sendToken(user,200,res);

})



// LOGOUT USER
const logOut = catchAsyncError(async(req,res) => {

    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message: "User logged out successfully"
    })
})




// get personal details
const getUser = catchAsyncError(async(req,res) => {
    const user = await User.findById(req.user.id);

 sendToken(user,200,res);
})





module.exports = { registerUser, loginUser,logOut,getUser };