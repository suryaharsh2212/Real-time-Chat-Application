import { User } from "../Database/Models/UserModel.js";
import isValidIndianPhoneNumber from "../Utilities/PhoneNovalidator.js";
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    const response = {
        message: "",
        error: true
    };

    try {
        const { fullname, phoneno, password, profile } = req.body;

        if (!fullname || !phoneno|| !password) {
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
            password:hashedPassword,
            profile:profile
        });

        response.message="User registered successfully.";
        response.error=false;
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error registering user:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default registerUser;
