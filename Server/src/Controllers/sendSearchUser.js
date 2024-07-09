import { User } from "../Database/Models/UserModel.js";

const searchUser = async (req, res) => {
    const response = {
        status: false,
        message: "",
        data: [],
    };

    try {
        const { name } = req.body;
        const users = await User.find({
            fullname: name 
        });
        if (users.length === 0) {
            response.message = "No users found with that name.";
            return res.status(404).json(response);
        }

        response.data = users[0];
        response.status = true;
        response.message = "Users fetched";

        return res.status(200).json(response);
    } catch (error) {
        console.error("An error occurred:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default searchUser;
