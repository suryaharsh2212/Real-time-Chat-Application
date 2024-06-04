import { Message } from "../Database/Models/Messagemodel.js";
const getConversation = async (req, res) => {
    const response = {
        status: "false",
        message: "",
        data: [],
        time:""
    };

    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            response.message = "SenderId and ReceiverId are required.";
            return res.status(400).json(response);
        }

        const conversation = await Message.findOne({
            users: {
                $all: [senderId, receiverId]
            }
        });

        if (conversation) {
            response.status = "true";
            response.message = "Conversation found.";
            response.data = conversation;
            
        } else {
            response.message = "No conversation found.";
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        response.message = "Internal server error.";
        return res.status(500).json(response);
    }
};

export default getConversation;
