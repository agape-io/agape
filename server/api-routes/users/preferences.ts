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
                message: 'User preferences found!',
                preferences: existingUser.preferences,
            });
        } else {
            res.status(500).send({
                status: 500,
                message: "User preferences does not exist!"
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

router.post('/update', async (req: Request, res: Response) => {
  if (req.body.userId && req.body.sexuality) {
    await connect();
    const userModel = mongoose.model('users', UserModel);
    const preferences = {
      sexuality: req.body.sexuality,
      maxDist: req.body.maxDist || "",
      ageRange: req.body.ageRange || "",
      religion: req.body.religion || "",
      hobbiesDisliked: req.body.hobbiesDisliked || ""
    }
    userModel.findOneAndUpdate(
      { userId: req.body.userId },
      { 
        $set: {
          preferences
        } 
      },
      { upsert: true },
      function (err, doc) {
        if (err) {
          res.status(500).send({
              status: 500,
              message: 'Error updating preferences!'
          });
          console.error(err);
      }
      else {
          res.status(201).send({
              status: 201,
              message: "Preferences updated!"
          })
      };
      }
    )
  }
});

export default router;