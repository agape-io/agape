import { Router, Request, Response } from 'express';

import { USER } from '../../config/constants';
import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR, USER_ERRORS } from '../../config/errorMessages';
import { CREATE_PROFILE_SUCCESS, GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

const router = Router();

/**
 * @api {get} /
 * @apiName Get User Profile
 * @apiGroup Users
 * @apiDescription Fetch user's profile
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
      .then(() => User.findOne({ _id: userId }, 'profile isOnline'))
      .then((user: USER) => {
        if (!user) throw new Error(USER_ERRORS.INVALID_ID);
        res.status(200).send({
          status: 200,
          message: GET_PROFILE_SUCCESS,
          profile: user.profile,
          isOnline: user.isOnline,
        });
      })
      .catch((err: Error) => {
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
 * @apiName Create User Profile
 * @apiGroup Users
 * @apiDescription Create user's profile
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * userId: string
 * name: string
 * gender: string
 * age: string
 * yearBorn: string
 * aboutMe: string
 * religion: string
 * location: string
 * hobbies: [string]
 * sexuality: string
 *
 * @apiVersion 0.1.0
 */
router.post('/create', (req: Request, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo,
  } = req.body;
  if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
    const profile: USER['profile'] = {
      name,
      age,
      gender,
      yearBorn,
      aboutMe,
      religion,
      location,
      hobbies,
      photo,
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            profile,
            preferences: {
              sexuality,
            },
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(201).send({
          status: 201,
          message: CREATE_PROFILE_SUCCESS,
        });
      })
      .catch((err: Error) => {
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
 * @apiName Update User Profile
 * @apiGroup Users
 * @apiDescription Update user's profile
 *
 * @apiSuccess (204)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * userId: string
 * name: string
 * gender: string
 * age: string
 * yearBorn: string
 * aboutMe: string
 * religion: string
 * location: string
 * hobbies: [string]
 * sexuality: string
 *
 * @apiVersion 0.1.0
 */
router.put('/update', (req: Request, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo,
  } = req.body;
  if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
    const profile: USER['profile'] = {
      name,
      age,
      gender,
      yearBorn,
      aboutMe,
      religion,
      location,
      hobbies,
      photo,
    };
    connect()
      .then(() => User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            profile,
            preferences: {
              sexuality,
            },
          },
        },
        { upsert: true },
      ))
      .then(() => {
        res.status(204).send({
          status: 204,
          message: UPDATE_PROFILE_SUCCESS,
        });
      })
      .catch((err: Error) => {
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
