const mongoose = require('mongoose')
const bcrypt=require('bcrypt');
const jwt =require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Password should be more than 6 characters"]
    },
    phoneNumber: {
        type: Number,

    },
    adress: [{
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        zipCode: {
            type: Number,
        },
        addressType: {
            type: String,
        }
    }],
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        public_id: {
            type: String,
            required: false,

        },
        url: {
            type: String,
            required:false,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,


});


//for encrypting the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password=await bcrypt.hash(this.password, 10)
});


//jwt token

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

//compare password

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports=mongoose.model("User",userSchema)