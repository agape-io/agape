import { Router, Request, Response } from 'express';
import mongoose from "mongoose";

import { UserModel } from "../../models/user";
import connect from '../../config/db';

const router = Router();

const commonElements = (array1, array2) => {
    return array1.some(item => array2.includes(item));
}

const getProfile = (user) => {
    return JSON.parse(JSON.stringify(user)).profile;
}

const getId = (user) => {
    return JSON.parse(JSON.stringify(user)).userId;
}

router.get('/', async (req: Request, res: Response) => {
    if (req.query.userId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findOne({ userId: req.query.userId }, async function (err, existingUser) {
            if (existingUser) {
                const users = await userModel.find({});
                const commonUsers = [];
                users.forEach(user => {
                    const currentUser = getProfile(existingUser);
                    const tempUser = getProfile(user);
                    if (commonElements(currentUser.hobbies, tempUser.hobbies)) {
                        commonUsers.push(getId(user));
                    };
                });
                // remove current user
                const index = commonUsers.indexOf(req.query.userId);
                if (index > -1) {
                    commonUsers.splice(index, 1);
                }
                if (commonUsers.length > 0) {
                    res.status(200).send({
                        status: 200,
                        users: commonUsers
                    })
                } else {
                    res.status(500).send({
                        status: 500,
                        message: "No matches found!"
                    });
                };
            } else {
                res.status(500).send({
                    status: 500,
                    message: "Cannot find current user!"
                });
            };
        });
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id!"
        })
    };
});

export default router;