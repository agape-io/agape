import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

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
router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    User.findOne({ _id: userId }, (err, existingUser) => {
      if (existingUser) {
        res.status(200).send({
          status: 200,
          message: 'Profile found!',
          profile: existingUser.profile,
          isOnline: existingUser.isOnline,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: 'User does not exist!',
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
router.post('/create', async (req: any, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo,
  } = req.body;
  if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
    await connect();
    const profile = {
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
    const preferences = {
      sexuality,
      maxDist: '',
      minAge: '',
      maxAge: '',
      religion: [],
    };
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          profile,
          preferences,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error creating profile! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Profile created!',
          });
        }
      },
    );
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing one of the required inputs!',
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
router.put('/update', async (req: any, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality, photo,
  } = req.body;
  if (userId && name && gender && age && yearBorn && aboutMe && religion && location && hobbies && sexuality) {
    await connect();
    const profile = {
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
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          profile,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating profile! ${err}`,
          });
          console.error(err);
        } else {
          res.status(204).send({
            status: 204,
            message: 'Profile updated!',
          });
        }
      },
    );
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing one of the required inputs!',
    });
  }
});

export default router;
