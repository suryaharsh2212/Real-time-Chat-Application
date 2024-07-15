import { OtpModel } from "../Database/Models/Otp.model.js";
import { User } from "../Database/Models/UserModel.js";
import { sendOTPEmail } from "../Utilities/Email/nodemailer.js";
import GenOtp from "../Utilities/genOTP.js";
import isValidIndianPhoneNumber from "../Utilities/PhoneNovalidator.js";
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    const response = {
        message: "",
        otp:false,
        error: true
    };

    try {
        const { fullname, phoneno,email,password, profile } = req.body;
        console.log(email);

        if (!fullname || !phoneno|| !password || !email) {
            response.message="Please ensure that all required fields, including Fullname, PhoneNumber, and About information, are provided.";
            response.error= true
            return res.status(400).json(response);
        }
        if(!isValidIndianPhoneNumber(phoneno))
            {
                response.message = "Phone number not valid";
                response.error= true
                return res.status(409).json(response);
            }
        const checkPhoneno = await User.findOne({ phoneno });
        if (checkPhoneno) {
            response.message = "Phone number already exists.";
            response.error= true
            return res.status(409).json(response);
        }
        
        const hashedPassword=await bcrypt.hash(password,10)
        
        const newUser=await User.create({
            fullname:fullname,
            phoneno:phoneno,
            email:email,
            password:hashedPassword,
            profile:profile
        });
        const otp=GenOtp();
        const newOTP= await OtpModel.create({
            email:email,
            otp:otp
        })
        console.log(email,otp);
        sendOTPEmail(email,otp);

        response.message="User registered successfully.";
        response.error=false;
        response.otp=true
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error registering user:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default registerUser;
