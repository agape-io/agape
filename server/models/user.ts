import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserModel = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
});