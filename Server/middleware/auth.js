const ErrorHandler = require("../utils/ErrorHandler");

const User=require("../Model/user")
const catchAsynErrors = require("./catchAsyncErrors");


const jwt = require("jsonwebtoken")


//Function to Verify jwt Token

exports.isAuthenticated = catchAsynErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
})