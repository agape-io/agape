import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR, USER_ERRORS } from '../../config/errorMessages';
import { CREATE_SETTINGS_SUCCESS, GET_SETTINGS_SUCCESS, UPDATE_SETTINGS_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

const router = Router();

/**
 * @api {get} /
 * @apiName Get User Settings
 * @apiGroup Users
 * @apiDescription Fetch user's settings
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
      .then(() => User.findOne({ _id: userId }, 'settings'))
      .then((user: any) => {
        if (!user) throw new Error(USER_ERRORS.INVALID_ID);
        res.status(200).send({
          status: 200,
          message: GET_SETTINGS_SUCCESS,
          settings: user.settings,
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
 * @apiName Create User Settings
 * @apiGroup Users
 * @apiDescription Create user's settings
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * userId: string
 * pushNotifications: boolean
 *
 * @apiVersion 0.1.0
 */
router.post('/create', (req: Request, res: Response) => {
  const { userId, pushNotifications } = req.body;
  if (userId && pushNotifications) {
    const settings = {
      pushNotifications,
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            settings,
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(201).send({
          status: 201,
          message: CREATE_SETTINGS_SUCCESS,
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
 * @apiName Update User Settings
 * @apiGroup Users
 * @apiDescription Update user's settings
 *
 * @apiSuccess (204)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * userId: string
 * pushNotifications: boolean
 *
 * @apiVersion 0.1.0
 */
router.put('/update', (req: Request, res: Response) => {
  const { userId, pushNotifications } = req.body;
  if (userId && pushNotifications) {
    const settings = {
      pushNotifications,
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            settings,
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(204).send({
          status: 204,
          message: UPDATE_SETTINGS_SUCCESS,
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
