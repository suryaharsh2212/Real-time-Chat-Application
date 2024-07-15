import mongoose from "mongoose";
const OtpSchema= new mongoose.Schema({
      email:{
        type:String
      },
      otp:{
        type:String
      }

},{timestamps:true})
export const OtpModel=mongoose.model("otp",OtpSchema);