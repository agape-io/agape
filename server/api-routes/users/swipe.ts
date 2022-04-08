import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR, USER_ERRORS } from '../../config/errorMessages';
import { SWIPE_LEFT_SUCCESS, SWIPE_RIGHT_MATCH_SUCCESS, SWIPE_RIGHT_NO_MATCH_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

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
router.put('/left', (req: Request, res: Response) => {
  const { userId, matchUserId } = req.body;
  if (userId && matchUserId) {
    connect()
      .then(() => User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            swipedLeft: matchUserId,
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(201).send({
          status: 201,
          message: SWIPE_LEFT_SUCCESS,
        });
      })
      .catch((err: any) => {
        console.error(err.message);
        res.status(500).send({
          status: 500,
          message: UNKNOWN_ERROR,
        });
      });
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
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
router.put('/right', (req: Request, res: Response) => {
  const { userId, matchUserId } = req.body;
  if (userId && matchUserId) {
    let potentialMatch: any = {};
    connect()
      .then(() => User.findOne({ _id: matchUserId }))
      .then((user: any) => {
        if (!user) throw new Error(USER_ERRORS.INVALID_MATCH_ID);
        potentialMatch = user;
        return User.findByIdAndUpdate(
          { _id: userId },
          {
            $push: {
              swipedRight: matchUserId,
            },
          },
          { upsert: true },
        );
      })
      .then(() => {
        const { swipedRight } = potentialMatch;
        if (swipedRight && swipedRight.includes(userId)) {
          res.status(201).send({
            status: 201,
            match: true,
            message: SWIPE_RIGHT_MATCH_SUCCESS,
          });
        } else {
          res.status(201).send({
            status: 201,
            match: false,
            message: SWIPE_RIGHT_NO_MATCH_SUCCESS,
          });
        }
      })
      .catch((err: any) => {
        if (err.message === USER_ERRORS.INVALID_MATCH_ID) {
          res.status(400).send({
            status: 400,
            message: err.message,
          });
        } else {
          console.error(err.message);
          res.status(500).send({
            status: 500,
            message: UNKNOWN_ERROR,
          });
        }
      });
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
    });
  }
});

export default router;
