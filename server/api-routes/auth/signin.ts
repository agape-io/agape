import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { User } from '../../models/user';
import connect from '../../config/db';
import { env } from '../../config/env';

const { JSONWebToken } = env;

const router = Router();

/**
 * @api {post} /email
 * @apiName Signin via Email
 * @apiGroup Auth
 * @apiDescription Signin user using email and password
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest POST /email
 *
 * @body
 * email: string
 * password: string
 *
 * @apiVersion 0.1.0
 */
router.post('/email', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    await connect();
    await User.findOne({
      email,
    })
      .then(async (user) => {
        if (user) {
          await bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (passwordMatch) {
              const userObj = {
                userId: user._id,
                email,
                token: null,
                isOnline: false,
              };
              const token = jwt.sign(
                { email: user.email },
                JSONWebToken.Key,
                {
                  expiresIn: '1hr',
                },
              );
              const subscriptionReset = moment(user.settings.endingDate).isSame(new Date(), 'day');
              if (subscriptionReset) {
                const { settings } = user;
                settings.billingDate = null;
                settings.endingDate = null;
                settings.membershipType = '6233c60d59af3002b221b0ce';
                user.save();
              }
              userObj.token = token;
              userObj.isOnline = true;
              res.status(200).send({
                status: 200,
                message: 'Logged In!',
                userObj,
                subscriptionReset,
              });
            } else {
              res.status(500).send({
                status: 500,
                message: 'Incorrect password!',
              });
            }
          });
        } else {
          res.status(500).send({
            status: 500,
            message: 'Invalid Email!',
          });
        }
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing Email or Password!',
    });
  }
});

export default router;
