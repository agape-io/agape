import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';
import {
  getId, getProfile, getPreferences, generatePercentage,
} from '../../util/match';

const router = Router();

/**
 * @api {get} /
 * @apiName Algorithm for discovery
 * @apiGroup Users
 * @apiDescription Algorithm for discovering other users
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * userId: string
 * romantic: string
 * threshold: int
 * 
 * @apiVersion 0.1.0
 */

router.get('/', async (req: Request, res: Response) => {
  const { userId, romantic = 'false', threshold = 0 } = req.query;
  if (userId) {
    await connect();
    User.findOne({ _id: userId }, async (err, existingUser) => {
      if (existingUser) {
        const users = await User.find({});
        const similarUsers = [];
        users.forEach((user) => {
          const percentage = generatePercentage(existingUser, user, romantic);
          if (percentage > parseFloat(threshold as string)) {
            similarUsers.push({
              userId: getId(user),
              profile: getProfile(user),
              preferences: {
                sexuality: getPreferences(user).sexuality,
              },
              percentage,
            });
          }
        });
        if (similarUsers.length > 0) {
          res.status(200).send({
            status: 200,
            users: similarUsers,
          });
        } else {
          res.status(500).send({
            status: 500,
            users: [],
            message: 'No matches found!',
          });
        }
      } else {
        res.status(500).send({
          status: 500,
          message: 'Cannot find current user!',
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

export default router;
