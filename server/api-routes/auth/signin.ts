import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import connect from '../../config/db';
import { env } from '../../config/env';

import { JWT_TOKEN_EXPIRY_TIME } from '../../constants/auth';
import { AUTH_ERRORS, MISSING_FIELDS, UNKNOWN_ERROR } from '../../constants/error';
import { SIGNIN_SUCCESS } from '../../constants/statusMessages';

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
    connect()
      .then(() => User.findOne({ email }, 'password'))
      .then((existingUser) => {
        if (!existingUser) throw new Error(AUTH_ERRORS.INVALID_EMAIL);
        user = existingUser;
        return bcrypt.compare(password, user.password);
      })
      .then((passwordMatch) => {
        if (!passwordMatch) throw new Error(AUTH_ERRORS.INVALID_PASSWORD);
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
        });
      })
      .catch((err) => {
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
