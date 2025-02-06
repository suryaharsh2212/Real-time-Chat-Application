import mongoose from "mongoose";

const UserSchema=new  mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true
    },
    password:{
        type:"String",
        required:true

    },
    profile:{
        type:String
    }
},{timestamps:true})
export const User=mongoose.model("User",UserSchema);