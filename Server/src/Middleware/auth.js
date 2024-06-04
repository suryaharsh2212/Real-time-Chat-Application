 import jwt from "jsonwebtoken"
import { User } from "../Database/Models/UserModel.js"
 
 
 export const verifyJWT=async(req,res,next)=>{
        try {
            const token=req.cookies.access_token || "not found"
        if(!token)
            {
                res.status(404).json({
                    message:"Unauthorized User"
                })
            }
        const decodeuser= jwt.verify(token,process.env.SECRETKEY)
        const user= User.findById(decodeuser._id)
           
     if(!token)
        {
            res.status(404).json({
                message:"Unauthorized User"
            })
        }
        req.user=user;
        next()
        } catch (error) {
            console.log(error);
        }
 }