import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (req.query.userId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findOne({ userId: req.query.userId }, async function (err, existingUser) {
            if (existingUser) {
                res.status(200).send({
                    status: 200,
                    message: 'Settings found!',
                    settings: existingUser.settings,
                });
            } else {
                res.status(500).send({
                    status: 500,
                    message: "User does not exist!"
                });
            };
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id!"
        })
    }
});

router.post('/create', async (req: Request, res: Response) => {
    if (req.body.userId && req.body.membershipType && req.body.pushNotifications) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const settings = {
            membershipType: req.body.membershipType,
            pushNotifications: req.body.pushNotifications,
        };
        userModel.findOneAndUpdate(
            { userId: req.body.userId },
            {
                $set: {
                    settings
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: 'Error creating settings!'
                    });
                    console.error(err);
                }
                else {
                    res.status(201).send({
                        status: 201,
                        message: "Settings created!"
                    })
                };
            }
        );
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing one of the required inputs!"
        })
    };
});

router.post('/update', async (req: Request, res: Response) => {
    if (req.body.userId && req.body.membershipType && req.body.pushNotifications) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const settings = {
            membershipType: req.body.membershipType,
            pushNotifications: req.body.pushNotifications,
        }
        userModel.findOneAndUpdate(
            { userId: req.body.userId },
            {
                $set: {
                    settings
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: 'Error updating settings!'
                    });
                    console.error(err);
                }
                else {
                    res.status(204).send({
                        status: 204,
                        message: "Settings updated!"
                    })
                };
            }
        );
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing one of the required inputs!"
        })
    };
});

export default router;
