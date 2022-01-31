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

router.post('/email', (req: Request, res: Response) => {
    // login with email and password
    if (req.body.email && req.body.password) {
        const userModel = mongoose.model('UserModel', UserModel);
        connect();
        userModel.findOne({ email: req.body.email }, function (err, existingUser) {
            // console.log(existingUser);
            if (existingUser) { // if email exists on our database
                bcrypt.compare(req.body.password, existingUser.password, function(err, passwordMatch) {
                    if (passwordMatch) {
                        res.status(200).send("Logged In!");
                    } else {
                        res.status(500).send({
                            error: "500: Incorrect password"
                        });
                    }
                })
            } else {
                res.status(500).send({
                    error: "500: Invalid Email"
                })
            };
        });
    } else {
        res.status(500).send({
            error: "500: Missing Email or Password"
        })
    }
});

export default router;