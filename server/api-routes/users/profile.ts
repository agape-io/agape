import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import { UserModel } from "../../models/user";
import connect from "../../config/db";

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
    // write code that gets the profile of a given user
});

router.post('/create', async (req: Request, res: Response) => {
    // write code that creates the profile for a given user
    if (req.body.name && req.body.gender && req.body.yearBorn && req.body.religion && req.body.location) {
        const testEmail = "randomemail@gmail.com";
        await connect;
        const userModel = mongoose.model('users', UserModel);
        const profile = {
            name: req.body.name,
            gender: req.body.gender,
            yearBorn: req.body.yearBorn,
            religion: req.body.location
        }
        // For testing MongoDB
        console.log("Here");
        userModel.find({}, function(err, result) {
            console.log("wat");
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });

        // Actual code to update the database and add Profile
        // userModel.findOneAndUpdate(
        //     {email: testEmail},
        //     {$set: {
        //         profile
        //     }},
        //     {upsert: true},
        //     function(err, doc) {
        //         if (err) console.log(err);
        //         else res.status(200).send({
        //                 status: 200, 
        //                 message: "Profile created!", 
        //                 profile
        //         });
        //     }
        // );
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing one of the required inputs!"
        })
    }
});

router.post('/update', async (req: Request, res: Response) => {
    // write code that updates the profile for a given user 
});

export default router;
