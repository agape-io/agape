import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

const router = Router();

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

router.post('/create', async (req: any, res: Response) => {
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

router.put('/update', async (req: any, res: Response) => {
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
