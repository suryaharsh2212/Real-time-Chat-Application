

import { User } from "../Database/Models/UserModel.js";
import isValidIndianPhoneNumber from "../Utilities/PhoneNovalidator.js";
import bcrypt from "bcrypt"
import genWebToken from "../Utilities/genAccessToken.js";


const LoginUser = async (req, res) => {
    const response = {
        message: "Login Sucesss",
        name:"",
        error: false,
        id:'',
        token:""
    }
    try {
        const { phoneno,password } = req.body
        const valid = isValidIndianPhoneNumber(phoneno);
        if (!valid) {
            response.message = "Invalid phone no Provided";
            response.error = "true"
            res.status(422).json({ response })
        }
        else {
           const findUser=await User.findOne({phoneno})
           if (!findUser) {
            response.message = "User not found";
            response.error = true;
            return res.status(404).json({ response });
           }
           const matchPass=await bcrypt.compare(password,findUser.password)
           if (!matchPass) {
            response.message = "Incorrect password";
            response.error = true;
            
            return res.status(401).json({ response });
           }
           const token=genWebToken(findUser._id)
           response.id=findUser._id
           response.token=token
           response.name=findUser.fullname
    
          res.cookie("access_token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        }).json({response});



        }

    } catch (error) {
        console.log("Error ", error.message);
        console.log(error);
    }
}
export default LoginUser