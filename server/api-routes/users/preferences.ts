import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

const router = Router();

/**
 * @api {get} /
 * @apiName User's preferences
 * @apiGroup Users
 * @apiDescription See user's preferences
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * userId: string
 * 
 * @apiVersion 0.1.0
 */

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    User.findOne({ _id: userId }, (err, existingUser) => {
      if (existingUser) {
        res.status(200).send({
          status: 200,
          message: 'User preferences found!',
          preferences: existingUser.preferences,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: 'User preferences does not exist!',
        });
      }
    });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

/**
 * @api {post} /create
 * @apiName Create User's preferences
 * @apiGroup Users
 * @apiDescription Create user's preferences
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * userId: String
 * sexuality: String
 * maxDist: String
 * minAge: String
 * maxAge: String
 * religion: String
 * 
 * @apiVersion 0.1.0
 */

router.post('/create', async (req: Request, res: Response) => {
  const { userId, sexuality } = req.body;
  if (userId && sexuality) {
    await connect();
    const {
      maxDist, minAge, maxAge, religion, userId,
    } = req.body;
    const preferences = {
      sexuality,
      maxDist: maxDist || '',
      minAge: minAge || '',
      maxAge: maxAge || '',
      religion: religion || '',
    };
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          preferences,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error creating preferences! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Preferences created!',
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

/**
 * @api {put} /update
 * @apiName Update User's preferences
 * @apiGroup Users
 * @apiDescription Update user's preferences
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * userId: String
 * sexuality: String
 * maxDist: String
 * minAge: String
 * maxAge: String
 * religion: String
 * 
 * @apiVersion 0.1.0
 */

router.put('/update', async (req: Request, res: Response) => {
  const { userId, sexuality } = req.body;
  if (userId && sexuality) {
    await connect();
    const {
      maxDist, minAge, maxAge, religion, userId,
    } = req.body;
    const preferences = {
      sexuality,
      maxDist: maxDist || '',
      minAge: minAge || '',
      maxAge: maxAge || '',
      religion: religion || '',
    };
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          preferences,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating preferences! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Preferences updated!',
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
