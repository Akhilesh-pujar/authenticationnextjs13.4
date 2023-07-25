import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type:String, 
        required:[true,"Please provide a username"],
        unique:true,
    },

    email:{
        type:String,
        required:[true, "Please provide mail id"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please provide Password"],
       
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
  forgotPasswordToken : String,
  forgotPasswordTokenExpiry:Date,
  verifyTokenExpiry:Date,



})

const USer = mongoose.models.users || mongoose.model("user",userSchema);

export default USer;
