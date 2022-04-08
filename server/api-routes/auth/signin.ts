import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { JWT_TOKEN_EXPIRY_TIME, MEMBERSHIP_TYPES } from '../../config/constants';
import connect from '../../config/db';
import { env } from '../../config/env';
import { AUTH_ERRORS, MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import { SIGNIN_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

const { JSONWebToken } = env;
const router = Router();

/**
 * @api {post} /email
 * @apiName Signin via Email
 * @apiGroup Auth
 * @apiDescription Signin user using email/password authentication
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
router.post('/email', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    let user: any = {};
    let needResubscription = false;
    connect()
      .then(() => User.findOne({ email }, 'password settings'))
      .then((existingUser: any) => {
        if (!existingUser) throw new Error(AUTH_ERRORS.INVALID_EMAIL);
        user = existingUser;
        return bcrypt.compare(password, user.password);
      })
      .then((passwordMatch: boolean) => {
        if (!passwordMatch) throw new Error(AUTH_ERRORS.INVALID_PASSWORD);
        return moment(user.settings.endingDate).isSame(new Date(), 'day');
      })
      .then((subscriptionReset: boolean) => {
        if (subscriptionReset) {
          const { settings } = user;
          settings.billingDate = null;
          settings.endingDate = null;
          settings.membershipType = MEMBERSHIP_TYPES.BASIC;
          needResubscription = true;
          return user.save();
        }
        return Promise.resolve();
      })
      .then(() => {
        const validatedUser = {
          userId: user._id,
          email,
          token: null,
          isOnline: false,
        };
        const token = jwt.sign(
          { email: validatedUser.email },
          JSONWebToken.Key,
          {
            expiresIn: JWT_TOKEN_EXPIRY_TIME,
          },
        );
        validatedUser.token = token;
        validatedUser.isOnline = true;
        res.status(200).send({
          status: 200,
          message: SIGNIN_SUCCESS,
          user: validatedUser,
          needResubscription,
        });
      })
      .catch((err: any) => {
        if (err.message === AUTH_ERRORS.INVALID_EMAIL || err.message === AUTH_ERRORS.INVALID_PASSWORD) {
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
      });
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
    });
  }
});

export default router;
