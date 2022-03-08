import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";

const router = Router();

router.put('/left', async (req: Request, res: Response) => {
    //? For the swipe left API, you would have the user who swiped and the user who was swiped on.
    //? You'd add the userId of the user who was swiped on to the array of swipedleft of the user who swiped. 
    const { userId, matchUserId } = req.body;
    if (userId && matchUserId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findByIdAndUpdate(
            { userId: userId },
            { 
                $push: {
                    swipedLeft: matchUserId
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: `Error updating Swiped Left Array! ${err}`
                    });
                    console.error(err);
                } else {
                    res.status(201).send({
                        status: 201,
                        message: "Swiped Left Array updated!"
                    })
                };
            }
        )
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id or Match User Id!"
        })
    }
});

router.put('/right', async (req: Request, res: Response) => {
    //? For the swipe right API, you'd add the userId of the user who was swiped on to the swiped 
    //? right array of the user who swiped. But this time, check the array of the user who was swiped 
    //? on and see if they swiped right on the user who swiped on them. If so, it's a match! 
    //? To indicate this, you can return an object with a match property that indicates true or false.
    const { userId, matchUserId } = req.body;
    if (userId && matchUserId) {
        await connect();
        const userModel = mongoose.model('users', UserModel);
        userModel.findByIdAndUpdate(
            { userId: userId },
            { 
                $push: {
                    swipedRight: matchUserId
                }
            },
            { upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(500).send({
                        status: 500,
                        message: `Error updating Swiped Right Array! ${err}`
                    });
                    console.error(err);
                } else {
                    res.status(201).send({
                        status: 201,
                        message: "Swiped Right Array updated!"
                    })
                };
            }
        );
        userModel.findOne({ userId: matchUserId }, function(err, user) {
            if (err) {
                res.status(500).send({
                    status: 500,
                    message: `Could not find user ${err}`
                });
            } else {
                const rightArray = user.swipedRight;
                for (let i = 0; i < rightArray.length; i++) {
                    if (rightArray[i] == userId) {
                        res.status(201).send({
                            status: 201,
                            message: "ITS A MATCH!!!"
                        })
                    }
                }
                res.status(201).send({
                    status: 201,
                    message: "Not a match"
                })
            }
            
        })
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id or Match User Id!"
        })
    }
});

export default router;