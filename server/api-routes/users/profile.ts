import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";
import { upload } from '../../middleware/imageUpload';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (userId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findOne({ userId: userId }, function (err, existingUser) {
            if (existingUser) {
                res.status(200).send({
                    status: 200,
                    message: 'Profile found!',
                    profile: existingUser.profile,
                    isOnline: existingUser.isOnline
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

router.post('/create', upload.single('photo'), async (req: any, res: Response) => {
    const { userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality } = req.body;
    if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: name,
            age: age,
            gender: gender,
            yearBorn: yearBorn,
            aboutMe: aboutMe,
            religion: religion,
            location: location,
            hobbies: hobbies,
        };
        const preferences = {
            sexuality: sexuality,
            maxDist: "",
            minAge: "",
            maxAge: "",
            religion: [],
        };
        if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
        userModel.findOneAndUpdate(
            { userId: userId },
            {
                $set: {
                    profile,
                    preferences
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: `Error creating profile! ${err}`
                    });
                    console.error(err);
                }
                else {
                    res.status(201).send({
                        status: 201,
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

router.put('/update', upload.single('photo'), async (req: any, res: Response) => {
    const { userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality } = req.body;
    if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: name,
            age: age,
            gender: gender,
            yearBorn: yearBorn,
            aboutMe: aboutMe,
            religion: religion,
            location: location,
            hobbies: hobbies,
        };
        if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
        userModel.findOneAndUpdate(
            { userId: userId },
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
                        message: `Error updating profile! ${err}`
                    });
                    console.error(err);
                }
                else {
                    res.status(204).send({
                        status: 204,
                        message: "Profile updated!"
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
