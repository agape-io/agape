import { Router, Request, Response } from 'express';

import { USER } from '../../config/constants';
import connect from '../../config/db';
import { USER_ERRORS, MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import { DISCOVER_MATCHES_FOUND, DISCOVER_NO_MATCHES_FOUND } from '../../config/statusMessages';

import { User } from '../../models/user';

import {
  getId, getProfile, getPreferences, generatePercentage, sortByPercentage, verifyUser,
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
router.get('/', (req: Request, res: Response) => {
  const {
    userId, romantic = 'false', threshold = 0, sort = 'false', numUsers = 0,
  } = req.query;
  if (userId) {
    let originalUser: USER = {
      _id: '',
      email: '',
      password: '',
    };
    connect()
      .then(() => User.findOne({ _id: userId })
        .then((existingUser: USER) => {
          if (!existingUser) throw new Error(USER_ERRORS.INVALID_ID);
          originalUser = existingUser;
          return verifyUser(originalUser);
        })
        .then((validUser: boolean) => {
          if (!validUser) throw new Error(USER_ERRORS.INCOMPLETE_USER);
          return User.find({ _id: { $ne: userId } }, 'profile preferences');
        })
        .then((users: USER[]) => {
          let similarUsers: any[] = [];
          users.forEach((user) => {
            if (verifyUser(user)) {
              const percentage = generatePercentage(originalUser, user, romantic as string);
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
              message: DISCOVER_MATCHES_FOUND,
            });
          } else {
            res.status(200).send({
              status: 200,
              users: [],
              message: DISCOVER_NO_MATCHES_FOUND,
            });
          }
        })
        .catch((err: Error) => {
          if (err.message === USER_ERRORS.INVALID_ID || err.message === USER_ERRORS.INCOMPLETE_USER) {
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
        }));
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
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
router.get('/myLikes', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    connect()
      .then(() => User.findOne({ _id: userId }))
      .then((user: any) => user.populate('swipedRight', 'profile'))
      .then((completeUser: USER) => res.status(200).send(completeUser.swipedRight))
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
router.get('/likesMe', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    let allUsers: any[];
    connect()
      .then(() => User.find({ swipedRight: { $elemMatch: { $eq: userId } } }, 'profile'))
      .then((users: USER[]) => {
        allUsers = users;
        return User.findOne({ _id: userId }, 'swipedLeft swipedRight');
      })
      .then((originalUser: USER) => {
        const swiped = (originalUser.swipedLeft as string[]).concat(originalUser.swipedRight as string[]);
        const swipedIds = [];
        swiped.forEach((swipe: any) => {
          swipedIds.push(swipe._id.toString());
        });
        const liked = [];
        allUsers.forEach((user) => {
          if (!swipedIds.includes(user._id.toString())) liked.push(user.profile);
        });
        res.status(200).send(liked);
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
