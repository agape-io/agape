import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
    if (req.body.email) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findOne({ email: req.body.email }, async function (err, existingUser) {
            if (existingUser) {
                res.status(200).send({
                    status: 200,
                    message: 'Profile found!',
                    profile: existingUser.profile
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
            message: "Missing email!"
        })
    }
});

router.post('/create', async (req: Request, res: Response) => {
    if (req.body.email && req.body.name && req.body.gender && req.body.yearBorn && req.body.religion && req.body.location && req.body.hobbies) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: req.body.name,
            gender: req.body.gender,
            yearBorn: req.body.yearBorn,
            religion: req.body.religion,
            location: req.body.location,
            hobbies: req.body.hobbies
        };
        userModel.findOneAndUpdate(
            { email: req.body.email },
            {
                $set: {
                    profile
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: 'Error creating profile!'
                    });
                    console.error(err);
                }
                else {
                    res.status(200).send({
                        status: 200,
                        message: "Profile created!"
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
    if (req.body.email && req.body.name && req.body.gender && req.body.yearBorn && req.body.religion && req.body.location && req.body.hobbies) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: req.body.name,
            gender: req.body.gender,
            yearBorn: req.body.yearBorn,
            religion: req.body.religion,
            location: req.body.location,
            hobbies: req.body.hobbies
        }
        userModel.findOneAndUpdate(
            { email: req.body.email },
            {
                $set: {
                    profile
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) console.log(err);
                else res.status(200).send({
                    status: 200,
                    message: "Profile updated!"
                });
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
