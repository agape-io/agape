import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ChatModel = new Schema({
    chatName: String,
    users: Array<String>(),
    latestMessage: String,
}, {
    timestamps: true,
});

