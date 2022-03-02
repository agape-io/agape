import { Router, Request, Response } from 'express';
import mongoose from "mongoose";

import { UserModel } from "../../models/user";
import connect from '../../config/db';
import { getId, getProfile, commonHobbies, matchAge, matchReligion, matchSexuality } from '../../util/match';

const router = Router();

const generatePercentage = (commonHobbies, ageMatch, religionMatch, sexualityMatch) => {
    let initialPercentage = 20;
    if (commonHobbies) initialPercentage += 20;
    if (ageMatch) initialPercentage += 20;
    if (religionMatch) initialPercentage += 10;
    if (sexualityMatch) initialPercentage += 30;
    return initialPercentage;

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
                    const percentage = generatePercentage(commonHobbies(existingUser, user), matchAge(existingUser, user), matchReligion(existingUser, user), matchSexuality(existingUser, user));
                    commonUsersId.push(getId(user));
                    commonUsersProfile.push({
                        userId: getId(user),
                        user: tempUser,
                        percentage: percentage,
                    });
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