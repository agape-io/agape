import { Router, Request, Response } from 'express';

import { USER } from '../../config/constants';
import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import { SIGNOUT_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

const router = Router();

/**
 * @api {post} /email
 * @apiName Signout via Email
 * @apiGroup Auth
 * @apiDescription Signout user using email/password authentication
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /email
 *
 * @body
 * userId: string
 *
 * @apiVersion 0.1.0
 */
router.post('/email', (req: Request, res: Response) => {
  const { userId } = req.body;
  if (userId) {
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            isOnline: false,
          },
        },
        {
          new: true,
          upsert: true,
        },
      ))
      .then((user: USER) => {
        res.status(201).send({
          status: 201,
          message: SIGNOUT_SUCCESS,
          user: {
            userId: user._id,
            isOnline: user.isOnline,
          },
        });
      })
      .catch((err: Error) => {
        console.error(err);
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

export default router;
