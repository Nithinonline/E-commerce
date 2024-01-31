const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const fs = require('fs');
const User = require("../Model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const router = express.Router()




router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const fileName = req.file.filename;
      const filePath = `uploads/${fileName}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting File" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    console.log(filename, fileUrl);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: ` Hello ${user.name} Please Click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email :- ${user.email} to activate your Account`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

//function to create activation token

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  })
}

//To activate user

router.post('activation', catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_Token } = req.body;
    const newUser = jwt.verify(
      activation_Token,
      process.env.ACTIVATION_SECRET
    );
    if(!newUser){
      return next(new ErrorHandler("Invalid Token",400))
    }
    const {name,email, password, avatar}=newUser;
    User.create({name, email, password, avatar})
    sendToken(newUser, 201, res)
  } catch (err) {

  }
}))

module.exports = router