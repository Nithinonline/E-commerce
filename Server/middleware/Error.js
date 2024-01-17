const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    err.message = err.message || 'internal Server Error'
}

//duplicate Key error

if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`
    err=new ErrorHandler(message,400)   //Object.keys is used to extract the keyValue from err
}