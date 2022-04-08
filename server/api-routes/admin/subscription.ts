import { Router, Request, Response } from 'express';

import { Plan } from '../../models/plan';
import connect from '../../config/db';

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
router.post('/create', async (req: any, res: Response) => {
  const { name, price } = req.body;
  if (name && price) {
    await connect();
    Plan.create(
      {
        name,
        price,
      },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error creating plan! ${err}`,
          });
          console.error(err);
        } else {
          res.status(201).send({
            status: 201,
            plan: {
              planId: doc._id,
              name: doc.name,
              price: doc.price,
            },
            message: 'Plan created!',
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
router.put('/update', async (req: any, res: Response) => {
  const { planId, name, price } = req.body;
  if (planId && name && price) {
    await connect();
    Plan.findOneAndUpdate(
      { _id: planId },
      {
        $set: {
          name,
          price,
        },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({
            status: 500,
            message: `Error updating plan! ${err}`,
          });
          console.error(err);
        } else {
          res.status(204).send({
            status: 204,
            message: 'Plan updated!',
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
