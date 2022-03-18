import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

const router = Router();

/**
 * @api {post} /email
 * @apiName Signout
 * @apiGroup Auth
 * @apiDescription Signout user
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
router.post('/email', async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (userId) {
    await connect();
    User.findOneAndUpdate(
      { userId },
      {
        $set: {
          isOnline: false,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: 'Error signing out!',
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Succesfully signed out!',
          });
        }
      },
    );
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

export default router;
