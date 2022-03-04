import { Router, Request, Response } from 'express';
import mongoose from "mongoose";

import { UserModel } from "../../models/user";
import connect from '../../config/db';

const router = Router();

router.post('/email', async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (userId) {
        const userModel = mongoose.model('users', UserModel);
        await connect();
        userModel.findOneAndUpdate(
            { userId: userId },
            {
                $set: {
                    isOnline: false,
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: 'Error signing out!'
                    });
                    console.error(err);
                }
                else {
                    res.status(201).send({
                        status: 201,
                        message: "Succesfully signed out!"
                    })
                };
            }
        );
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id!"
        });
    };
});

export default router;