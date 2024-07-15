import { Router } from "express";
import LoginUser from "../Controllers/LoginUser.js"
import send_msg from "../Controllers/SendMessage.js";
import getConversation from "../Controllers/getConversation.js";
import getUser from "../Controllers/getUser.js";
import registerUser from "../Controllers/registerUser.js";
import { verifyJWT } from "../Middleware/auth.js";
import getCurrentUser from "../Controllers/getCurrentUserChatting.js";
import UseLogout from "../Controllers/LogoutUser.js";
import searchUser from "../Controllers/sendSearchUser.js";
import VerifyOTP from "../Controllers/VerifyOtp.js";

const router=Router()

router.route("/login").post(LoginUser)
router.route("/send").post(send_msg)
router.route("/getconversation").post(getConversation)
router.route("/getuser").post(getUser)
router.route("/registeruser").post(registerUser)
router.route("/getcurrentuser").post(getCurrentUser)
router.route("/logout").post(UseLogout)
router.route("/search").post(searchUser)
router.route("/verify").post(VerifyOTP)


export {router}     