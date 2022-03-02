import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserModel = new Schema({
    userId: String,
    email: String,
    password: String,
    isOnline: Boolean,
    profile: {
        name: String,
        age: Number,
        gender: String,
        yearBorn: String,
        aboutMe: String,
        religion: String,
        location: String,
        hobbies: Array<String>(),
        photo: String,
    },
    preferences: {
        sexuality: String,
        maxDist: String,
        minAge: String,
        maxAge: String,
        religion: Array<String>(),
    },
    settings: {
        pushNotifications: Boolean,
        membershipType: String,
    }
});