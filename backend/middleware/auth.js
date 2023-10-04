const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        res.status(404).json({
            success:false,
            message:"Please login to access this resource"
        })
    }

    const decodedData = jwt.verify(token,process.env.SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();

})

exports.authorizeRoles = (...roles) => {
    return(req,res,next) => {
      if(!roles.includes(req.user.role)){
        return next(
            res.status(404).json({
                success:false,
                message:`Role ${req.user.role} is not allowed to access this resource`
            })
        )
      }
      next();
    }
}