import { Router, Request, Response } from 'express';

import { User } from '../../models/user';
import connect from '../../config/db';

const router = Router();

/**
 * @api {get} /myPlan
 * @apiName Get User Subscription Plan
 * @apiGroup Users
 * @apiDescription Fetch user's subscription plan
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
router.get('/myPlan', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    await User.findOne({
      _id: userId,
    })
      .populate('settings.membershipType', '-createdAt -updatedAt -__v')
      .then((user) => {
        res.status(200).send({
          status: 200,
          message: 'Subscription found!',
          subscription: user.settings.membershipType,
        });
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

export default router;