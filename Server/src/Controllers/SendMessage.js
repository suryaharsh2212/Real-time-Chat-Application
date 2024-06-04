import { Message } from "../Database/Models/Messagemodel.js";
import { io } from "../socket.io/socketConnection.js";
const send_msg = async (req, res) => {
    const response = {
        message: "No msg",
        status: "Inactive",
        sent: "false"
    };
    try {
        const { message, senderId, receiverId } = req.body;

        
        const conversation = await Message.findOne({
            users: {
                $all: [
                    senderId, 
                    receiverId
                ]
            }
        });
        if (!conversation) {
            const newConversation = await Message.create({
                users: [senderId, receiverId],
                messages: [{ user: senderId, message: message }]
            });
            io.emit(`new-message${receiverId._id}`,{message,senderId,receiverId})

            response.message = message;
            response.status = "active";
            response.sent = "true";
        } else {
            const newMessage = {
                user: senderId,
                message: message
            };
            await Message.updateOne(
                { _id: conversation._id },
                { $push: { messages: newMessage }}
            );
            io.emit(`new-message${receiverId._id}`,{message,senderId,receiverId})
            response.message=message;
            response.status="active"
            response.sent="true"
        }


        res.status(200).json({ response });
    } catch (error) {
        console.log("Some error occurred", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default send_msg;
