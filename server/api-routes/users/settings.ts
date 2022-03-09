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
          message: 'Settings found!',
          settings: existingUser.settings,
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

router.post('/create', async (req: Request, res: Response) => {
  const { userId, membershipType, pushNotifications } = req.body;
  if (userId && membershipType && pushNotifications) {
    await connect();
    const settings = {
      membershipType,
      pushNotifications,
    };
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          settings,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error creating settings! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            message: 'Settings created!',
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

router.put('/update', async (req: Request, res: Response) => {
  const { userId, membershipType, pushNotifications } = req.body;
  if (userId && membershipType && pushNotifications) {
    await connect();
    const settings = {
      membershipType,
      pushNotifications,
    };
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          settings,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating settings! ${err}`,
          });
          console.error(err);
        } else {
          res.status(204).send({
            status: 204,
            message: 'Settings updated!',
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
