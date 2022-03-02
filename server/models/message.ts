import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ChatModel = new Schema({
    sender: String,
    content: String,
    chat: String,
}, {
    timestamps: true,
});

