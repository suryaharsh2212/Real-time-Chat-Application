import { User } from "../Database/Models/UserModel.js";
const getCurrentUser = async (req, res) => {
    const response = {
        status: false,
        message: "",
        data: [],
        
    };
    try { 

        const {Id}=req.body
        const Users=await User.findById(Id)
        response.data = Users;
        response.status=false
        response.message="User fetched"
    
         return res.status(200).json(response);

    } catch (error) {
        console.error("An error occurred:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response); 
    }
};

export default getCurrentUser;
