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
                const commonUsersId = [];
                const commonUsersProfile = [];
                users.forEach(user => {
                    const currentUser = getProfile(existingUser);
                    const tempUser = getProfile(user);
                    if (commonElements(currentUser.hobbies, tempUser.hobbies)) {
                        commonUsersId.push(getId(user));
                        commonUsersProfile.push(tempUser);
                    };
                });
                // remove current user
                const index = commonUsersId.indexOf(req.query.userId);
                if (index > -1) {
                    commonUsersId.splice(index, 1);
                    commonUsersProfile.splice(index, 1);
                }
                if (commonUsersId.length > 0) {
                    res.status(200).send({
                        status: 200,
                        users: commonUsersProfile
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