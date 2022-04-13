import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR, USER_ERRORS } from '../../config/errorMessages';
import { CREATE_PREFERENCES_SUCCESS, GET_PREFERENCES_SUCCESS, UPDATE_PREFERENCES_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

const router = Router();

/**
 * @api {get} /
 * @apiName Get User Preferences
 * @apiGroup Users
 * @apiDescription Fetch user's preferences
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
router.get('/', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    connect()
      .then(() => User.findOne({ _id: userId }, 'preferences'))
      .then((user: any) => {
        if (!user) throw new Error(USER_ERRORS.INVALID_ID);
        res.status(200).send({
          status: 200,
          message: GET_PREFERENCES_SUCCESS,
          preferences: user.preferences,
        });
      })
      .catch((err: any) => {
        if (err.message === USER_ERRORS.INVALID_ID) {
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

/**
 * @api {post} /create
 * @apiName Create User Preferences
 * @apiGroup Users
 * @apiDescription Create user's preferences
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * userId: string
 * sexuality: string
 * maxDist: string
 * minAge: string
 * maxAge: string
 * religion: string
 *
 * @apiVersion 0.1.0
 */
router.post('/create', (req: Request, res: Response) => {
  const { userId, sexuality } = req.body;
  if (userId && sexuality) {
    const {
      maxDist, minAge, maxAge, religion,
    } = req.body;
    const preferences = {
      sexuality,
      maxDist: maxDist || '',
      minAge: minAge || '',
      maxAge: maxAge || '',
      religion: religion || '',
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            preferences,
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(201).send({
          status: 201,
          message: CREATE_PREFERENCES_SUCCESS,
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
 * @api {put} /update
 * @apiName Update User Preferences
 * @apiGroup Users
 * @apiDescription Update user's preferences
 *
 * @apiSuccess (204)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * userId: string
 * sexuality: string
 * maxDist: string
 * minAge: string
 * maxAge: string
 * religion: string
 *
 * @apiVersion 0.1.0
 */
router.put('/update', (req: Request, res: Response) => {
  const {
    userId, sexuality, maxDist, minAge, maxAge, religion,
  } = req.body;
  if (userId && sexuality && maxDist && minAge && maxAge && religion) {
    const preferences = {
      sexuality,
      maxDist,
      minAge,
      maxAge,
      religion,
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            preferences,
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(204).send({
          status: 204,
          message: UPDATE_PREFERENCES_SUCCESS,
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

export default router;
