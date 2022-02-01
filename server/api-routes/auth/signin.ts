import { Router, Request, Response } from 'express';
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { UserModel } from "../../models/user";
import connect from '../../config/db';

const router = Router();

// TODO: will implement if time permits
// router.post('/google', (req: Request, res: Response) => {
//     // login with google
// });

// TODO: will implement if time permits
// router.post('/facebook', (req: Request, res: Response) => {
//     // login with facebook
// });

router.post('/email', async (req: Request, res: Response) => {
    // login with email and password
    if (req.body.email && req.body.password) {
        const userModel = mongoose.model('UserModel', UserModel);
        await connect();
        userModel.findOne({ email: req.body.email }, async function (err, existingUser) {
            if (existingUser) { // if email exists on our database
                await bcrypt.compare(req.body.password, existingUser.password, function (err, passwordMatch) {
                    if (passwordMatch) {
                        res.status(200).send({
                            status: 200,
                            message: "Logged In!"
                        });
                    } else {
                        res.status(500).send({
                            status: 500,
                            message: "Incorrect password"
                        });
                    };
                });
            } else {
                res.status(500).send({
                    status: 500,
                    message: "Invalid Email"
                });
            };
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing Email or Password"
        });
    };
});

export default router;