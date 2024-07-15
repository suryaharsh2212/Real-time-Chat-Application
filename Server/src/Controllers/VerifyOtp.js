import { OtpModel } from "../Database/Models/Otp.model.js";

const VerifyOTP = async (req, res) => {
    const response = {
        verify: false,
        message: ""
    };

    try {
        const { email,otp } = req.body;


        const findotp = await OtpModel.findOne({
            email: email,
            otp: otp
        });
    

        if (findotp) {
            console.log(findotp);
            response.verify = true;
            response.message = "OTP verified";
            await OtpModel.deleteOne({ email: email,
                otp: otp})

        } else {
            console.log("OTP not found");
            response.message = "Invalid OTP";
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error("An error occurred:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default VerifyOTP;
