import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';
import {
  getId, getProfile, getPreferences, generatePercentage, sortByPercentage, completeUser,
} from '../../util/match';

const router = Router();

/**
 * @api {get} /
 * @apiName Discover Algorithm
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
 * sort: string
 * numUsers: int
 *
 * @apiVersion 0.1.0
 */
router.get('/', async (req: Request, res: Response) => {
  const {
    userId, romantic = 'false', threshold = 0, sort = 'false', numUsers = 0,
  } = req.query;
  if (userId) {
    await connect();
    User.findOne({ _id: userId }, async (err, existingUser) => {
      if (existingUser) {
        if (completeUser(existingUser)) {
          const users = await User.find({});
          let similarUsers = [];
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
            if (numUsers > 0 || sort === 'true') {
              similarUsers = sortByPercentage(similarUsers);
              if (numUsers > 0) similarUsers = similarUsers.slice(0, parseInt(numUsers as string));
            }
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
          res.status(400).send({
            status: 400,
            message: 'User has not completed their profile or preferences!',
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

/**
 * @api {get} /
 * @apiName Users likes
 * @apiGroup Users
 * @apiDescription Fetch user's likes' profiles
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
router.get('/likes', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    await User.findOne({
      _id: userId,
    })
      .populate('swipedRight', 'profile')
      .then((user) => {
        res.status(200).send(user.swipedRight);
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

/**
 * @api {get} /
 * @apiName User's liked profiles
 * @apiGroup Users
 * @apiDescription Fetch profiles who liked current user
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
router.get('/liked', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    await User.find({
      swipedRight: { $elemMatch: { $eq: userId } },
    }, 'profile')
      .then(async (results) => {
        const user = await User.findOne({
          _id: userId,
        }, 'swipedLeft swipedRight');
        const swiped = user.swipedLeft.concat(user.swipedRight);
        const swipedIds = [];
        swiped.forEach((swipe) => {
          swipedIds.push(swipe._id.toString());
        });
        const liked = [];
        results.forEach((user) => {
          if (!swipedIds.includes(user._id.toString())) liked.push(user);
        });
        res.status(200).send(liked);
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

export default router;
