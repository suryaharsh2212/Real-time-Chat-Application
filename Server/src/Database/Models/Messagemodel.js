import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    users: {
        type: [String]
    },
    messages: {
        type: [{
            user: String,
            message: String,
            timestamp: {
                type: Date,
                default: Date.now // Set default value to current timestamprs
            }
        }],
        default: []
    }
}, { timestamps: { currentTime: () => Date.now() } });

export const Message = mongoose.model("Message", MessageSchema);
