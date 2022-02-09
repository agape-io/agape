import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserModel = new Schema({
    userId: String,
    email: String,
    password: String,
    profile: {
        name: String,
        gender: String,
        yearBorn: String,
        religion: String,
        location: String,
        hobbies: Array<String>()
    },
});