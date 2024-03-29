const express = require("express");
const ErrorHandler = require("./middleware/Error");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors=require('cors')


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:`http://localhost:5173`,
    credentials:true,
}))
app.use("/", express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));


//route import
const user = require("./controller/user")
app.use('/api/v2', user)



//For Error handling
app.use(ErrorHandler)

module.exports = app