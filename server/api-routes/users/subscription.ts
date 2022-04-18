import { Router, Request, Response } from 'express';
import moment from 'moment';

import { DATE_FORMAT } from '../../config/constants';
import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import {
  SUBSCRIPTION_GET_PLAN_SUCCESS, SUBSCRIPTION_GET_PLANS_SUCCESS, USER_PLAN_CANCELLATION, USER_PLAN_SUBSCRIPTION,
} from '../../config/statusMessages';

import { User } from '../../models/user';
import { Plan } from '../../models/plan';

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
router.get('/', (req: Request, res: Response) => {
  connect()
    .then(() => Plan.find({}, '-createdAt -updatedAt -__v'))
    .then((plans: any[]) => res.status(200).send({
      status: 200,
      plans,
      message: SUBSCRIPTION_GET_PLANS_SUCCESS,
    }))
    .catch((err: any) => {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: UNKNOWN_ERROR,
      });
    });
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
router.get('/myPlan', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    connect()
      .then(() => User.findOne({
        _id: userId,
      }).populate('settings.membershipType', '-createdAt -updatedAt -__v'))
      .then((user: any) => {
        const { settings } = user;
        let endingDate = null;
        if (settings.endingDate != null) endingDate = moment(settings.endingDate).format(DATE_FORMAT);
        res.status(200).send({
          status: 200,
          message: SUBSCRIPTION_GET_PLAN_SUCCESS,
          subscription: settings.membershipType,
          endingDate,
        });
      })
      .catch((err: any) => {
        console.error(err);
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
 * @api {post} /subscribe
 * @apiName Subscribe User to Plan
 * @apiGroup Users
 * @apiDescription Subscribe user to a plan
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
router.post('/subscribe', (req: Request, res: Response) => {
  const { userId, planId } = req.body;
  if (userId && planId) {
    connect()
      .then(() => {
        const date = new Date();
        const nextMonthDate = date.setMonth(date.getMonth() + 1);
        const settings = {
          membershipType: planId,
          endingDate: nextMonthDate,
          billingDate: nextMonthDate,
        };
        return User.findByIdAndUpdate(
          { _id: userId },
          {
            $set: {
              settings,
            },
          },
        );
      })
      .then(() => res.status(200).send({
        status: 200,
        message: USER_PLAN_SUBSCRIPTION,
      }))
      .catch((err: any) => {
        console.error(err);
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
 * @api {post} /cancel
 * @apiName Cancel User Subscription
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
router.post('/cancel', (req: Request, res: Response) => {
  const { userId } = req.body;
  if (userId) {
    connect()
      .then(() => User.findById({
        _id: userId,
      }))
      .then((user: any) => {
        const { settings } = user;
        settings.billingDate = null;
        return user.save();
      })
      .then(() => res.status(201).send({
        status: 201,
        message: USER_PLAN_CANCELLATION,
      }))
      .catch((err: any) => {
        console.error(err);
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
