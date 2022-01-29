import mongoose from "mongoose";
import { env } from "../config/env";

const { MongoDB } = env;

export default async function connect() {
    await mongoose
        .connect(`${MongoDB.ConnString}`)
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((err) => {
            console.log("MongoDB connection unsuccessful");
        });
}

