import { Router, Request, Response } from 'express';

import { PLAN } from '../../config/constants';
import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import { SUBSCRIPTION_CREATE_PLAN_SUCCESS, SUBSCRIPTION_GET_PLANS_SUCCESS, SUBSCRIPTION_UPDATE_PLAN_SUCCESS } from '../../config/statusMessages';

import { Plan } from '../../models/plan';

const router = Router();

/**
 * @api {get} /
 * @apiName Get Subscription Plans
 * @apiGroup Subscription
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
    .then((plans: PLAN[]) => res.status(200).send({
      status: 200,
      plans,
      message: SUBSCRIPTION_GET_PLANS_SUCCESS,
    }))
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: UNKNOWN_ERROR,
      });
    });
});

/**
 * @api {post} /create
 * @apiName Create Plan
 * @apiGroup Subscription
 * @apiDescription Create plan
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /create
 *
 * @body
 * name: string
 * price: string
 *
 * @apiVersion 0.1.0
 */
router.post('/create', (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (name && price) {
    connect()
      .then(() => Plan.create({ name, price }))
      .then((plan: PLAN) => res.status(201).send({
        status: 201,
        plan: {
          planId: plan._id,
          name: plan.name,
          price: plan.price,
        },
        message: SUBSCRIPTION_CREATE_PLAN_SUCCESS,
      }))
      .catch((err: Error) => {
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
 * @api {put} /update
 * @apiName Update Plan
 * @apiGroup Subscription
 * @apiDescription Update plan
 *
 * @apiSuccess (204)
 *
 * @apiSampleRequest PUT /update
 *
 * @body
 * name: string
 * price: string
 *
 * @apiVersion 0.1.0
 */
router.put('/update', (req: Request, res: Response) => {
  const { planId, name, price } = req.body;
  if (planId && name && price) {
    connect()
      .then(() => Plan.findOneAndUpdate(
        { _id: planId },
        {
          $set: {
            name,
            price,
          },
        },
        { upsert: true },
      ))
      .then(() => res.status(204).send({
        status: 204,
        message: SUBSCRIPTION_UPDATE_PLAN_SUCCESS,
      }))
      .catch((err: Error) => {
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
