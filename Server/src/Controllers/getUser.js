import { User } from "../Database/Models/UserModel.js";

const getUser = async (req, res) => {
    const response = {
        status: false,
        message: "",
        data: [],
    };

    try {
        const users = await User.find();
        response.data = users;
        response.status = true;
        response.message = "Users fetched";

        return res.status(200).json(response);
    } catch (error) {
        console.error("An error occurred:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default getUser;

