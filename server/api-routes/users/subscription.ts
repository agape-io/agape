import { Router, Request, Response } from 'express';
import moment from 'moment';

import { User } from '../../models/user';
import { Plan } from '../../models/plan';
import connect from '../../config/db';

const router = Router();

/**
 * @api {get} /
 * @apiName Get Subscription Plans
 * @apiGroup Users
 * @apiDescription Fetch subscription plans
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @apiVersion 0.1.0
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    await connect();
    const plans = await Plan.find({}, '-createdAt -updatedAt -__v');
    res.status(200).send({
      status: 200,
      plans,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: 'Error fetching plans!',
    });
  }
});

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
  const { userId } = req.body;
  if (userId) {
    await connect();
    await User.findOne({
      _id: userId,
    })
      .populate('settings.membershipType', '-createdAt -updatedAt -__v')
      .then((user) => {
        const { settings } = user;
        let endingDate = null;
        if (settings.endingDate != null) endingDate = moment(settings.endingDate).format('MM/DD/YYYY');
        res.status(200).send({
          status: 200,
          message: 'Subscription found!',
          subscription: settings.membershipType,
          endingDate,
        });
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

/**
 * @api {post} /subscribe
 * @apiName Subscribe to a plan
 * @apiGroup Users
 * @apiDescription POST User's subscription
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest POST /
 *
 * @query
 * userId: string
 *
 * @apiVersion 0.1.0
 */
router.post('/subscribe', async (req: Request, res: Response) => {
  const { userId, planId } = req.body;
  if (userId && planId) {
    await connect();
    const date = new Date();
    const nextMonthDate = date.setMonth(date.getMonth() + 1);
    const settings = {
      membershipType: planId,
      endingDate: nextMonthDate,
      billingDate: nextMonthDate,
    };
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          settings,
        },
      },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating subscription! ${err}`,
          });
        } else {
          res.status(201).send({
            status: 201,
            message: 'Subscription updated!',
          });
        }
      },
    );
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id or Subscription Plan Id!',
    });
  }
});

/**
 * @api {post} /cancel
 * @apiName Cancel user's subscription plan
 * @apiGroup Users
 * @apiDescription Cancel user's subscription plan
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest POST /
 *
 * @query
 * userId: string
 *
 * @apiVersion 0.1.0
 */
router.post('/cancel', async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (userId) {
    await connect();
    await User.findById({
      _id: userId,
    })
      .then((user) => {
        const { settings } = user;
        settings.billingDate = null;
        user.save();
        res.status(201).send({
          status: 201,
          message: 'Subscription canceled! User will not be billed at the end of the month!',
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
