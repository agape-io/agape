import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';
import { upload } from '../../middleware/imageUpload';

const router = Router();

/**
 * @api {get} /
 * @apiName User's profile
 * @apiGroup Users
 * @apiDescription See user's profile
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * userId: String
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
 * @apiName Create User's profile
 * @apiGroup Users
 * @apiDescription Create user's profile
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * userId: String
 * name: String
 * gender: String
 * age: String
 * yearBorn: String
 * aboutMe: String
 * religion: String
 * location: String
 * hobbies: Array<String>()
 * sexuality: String
 * 
 * @apiVersion 0.1.0
 */

router.post('/create', upload.single('photo'), async (req: any, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality,
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
    };
    const preferences = {
      sexuality,
      maxDist: '',
      minAge: '',
      maxAge: '',
      religion: [],
    };
    if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
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
 * @apiName Update User's profile
 * @apiGroup Users
 * @apiDescription Update user's profile
 *
 * @apiSuccess (204)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * userId: String
 * name: String
 * gender: String
 * age: String
 * yearBorn: String
 * aboutMe: String
 * religion: String
 * location: String
 * hobbies: Array<String>()
 * sexuality: String
 * 
 * @apiVersion 0.1.0
 */

router.put('/update', upload.single('photo'), async (req: any, res: Response) => {
  const {
    userId, name, gender, age, yearBorn, aboutMe, religion, location, hobbies, sexuality,
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
    };
    if (req.file) (profile as any).photo = `uploads/${req.file.filename}`;
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
