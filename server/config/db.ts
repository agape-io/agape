import mongoose from "mongoose";
import dotenv from "dotenv";

export default function connect() {
    mongoose
        .connect(process.env.DEV_DB)
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((err) => {
            console.log("MongoDB connection unsuccessful");
        });
}

