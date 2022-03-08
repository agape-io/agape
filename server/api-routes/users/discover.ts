import { Router, Request, Response } from 'express';

import { User } from "../../models/user";
import connect from '../../config/db';
import { getId, getProfile, getPreferences, commonHobbies, matchAge, matchReligion, matchSexuality } from '../../util/match';

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
    const { userId } = req.query;
    if (userId) {
        await connect();
        User.findOne({ _id: userId }, async function (err, existingUser) {
            if (existingUser) {
                const users = await User.find({});
                const similarUsersIds = [];
                const similarUsersProfiles = [];
                users.forEach(user => {
                    const percentage = generatePercentage(commonHobbies(existingUser, user), matchAge(existingUser, user), matchReligion(existingUser, user), matchSexuality(existingUser, user));
                    similarUsersIds.push(getId(user));
                    similarUsersProfiles.push({
                        userId: getId(user),
                        profile: getProfile(user),
                        preferences: {
                            sexuality: getPreferences(user).sexuality
                        },
                        percentage: percentage,
                    });
                });
                // remove current user
                const index = similarUsersIds.indexOf(userId);
                if (index > -1) {
                    similarUsersIds.splice(index, 1);
                    similarUsersProfiles.splice(index, 1);
                }
                if (similarUsersIds.length > 0) {
                    res.status(200).send({
                        status: 200,
                        users: similarUsersProfiles
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