import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

const router = Router();

/**
 * @api {put} /left
 * @apiName Swipe Left API
 * @apiGroup Users
 * @apiDescription Update user's left swipes
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest PUT /left
 *
 * @body
 * userId: string
 * matchUserId: string
 *
 * @apiVersion 0.1.0
 */
router.put('/left', async (req: Request, res: Response) => {
  const { userId, matchUserId } = req.body;
  if (userId && matchUserId) {
    await connect();
    User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          swipedLeft: matchUserId,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating Swiped Left Array! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Swiped Left Array updated!',
          });
        }
      },
    );
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id or Match User Id!',
    });
  }
});

/**
 * @api {put} /right
 * @apiName Swipe Right API
 * @apiGroup Users
 * @apiDescription Update user's right swipes
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest PUT /right
 *
 * @body
 * userId: string
 * matchUserId: string
 *
 * @apiVersion 0.1.0
 */
router.put('/right', async (req: Request, res: Response) => {
  const { userId, matchUserId } = req.body;
  if (userId && matchUserId) {
    await connect();
    User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          swipedRight: matchUserId,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating Swiped Right Array! ${err}`,
          });
          console.error(err);
        }
      },
    );
    User.findOne({ userId: matchUserId }, (err, user) => {
      if (err) {
        res.status(500).send({
          status: 500,
          message: `Could not find user ${err}`,
        });
      } else {
        const rightArray = user.swipedRight;
        for (let i = 0; i < rightArray.length; i++) {
          if (rightArray[i] == userId) {
            res.status(201).send({
              status: 201,
              match: true,
              message: 'ITS A MATCH!!!',
            });
          }
        }
        res.status(201).send({
          status: 201,
          match: false,
          message: 'Not a match',
        });
      }
    });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id or Match User Id!',
    });
  }
});

export default router;
