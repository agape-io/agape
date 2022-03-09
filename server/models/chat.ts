import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatModel = new Schema({
    chatName: { type: String, trim: true },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
}, {
    timestamps: true,
});

export const Chat = mongoose.model("Chat", ChatModel);

