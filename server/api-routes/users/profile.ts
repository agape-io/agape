import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";
import { upload } from '../../middleware/imageUpload';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (req.query.userId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findOne({ userId: req.query.userId }, async function (err, existingUser) {
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
    if (req.body.userId && req.body.name && req.body.gender && req.body.yearBorn && req.body.aboutMe && 
        req.body.religion && req.body.location && req.body.hobbies && req.body.sexuality) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: req.body.name,
            gender: req.body.gender,
            yearBorn: req.body.yearBorn,
            aboutMe: req.body.aboutMe,
            religion: req.body.religion,
            location: req.body.location,
            hobbies: req.body.hobbies,
        };
        const preferences = {
            sexuality: req.body.sexuality,
            maxDist: "",
            ageRange: "",
            religion: "",
            hobbiesDisliked: [
                ""
            ]
        }
        if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
        userModel.findOneAndUpdate(
            { userId: req.body.userId },
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
                        message: 'Error creating profile!'
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

router.post('/update', upload.single('photo'), async (req: any, res: Response) => {
    if (req.body.userId && req.body.name && req.body.gender && req.body.yearBorn && req.body.aboutMe && req.body.religion && req.body.location && req.body.hobbies) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: req.body.name,
            gender: req.body.gender,
            yearBorn: req.body.yearBorn,
            aboutMe: req.body.aboutMe,
            religion: req.body.religion,
            location: req.body.location,
            hobbies: req.body.hobbies,
        };
        if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
        userModel.findOneAndUpdate(
            { userId: req.body.userId },
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
                        message: 'Error updating profile!'
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
