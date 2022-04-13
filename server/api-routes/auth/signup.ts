import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { AUTH_ERRORS, MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';
import { SIGNUP_SUCCESS } from '../../config/statusMessages';

import { User } from '../../models/user';

import { generateHash, validatePassword } from '../../util/auth';

const router = Router();

/**
 * @api {post} /email
 * @apiName Signup via Email
 * @apiGroup Auth
 * @apiDescription Signup user using email/password authentication
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest POST /email
 *
 * @body
 * email: string
 * password: string
 * verifyPassword: string
 *
 * @apiVersion 0.1.0
 */
router.post('/email', (req: Request, res: Response) => {
  const { email, password, verifyPassword } = req.body;
  if (email && password && verifyPassword) {
    if (!(password === verifyPassword)) {
      res.status(400).send({
        status: 400,
        message: AUTH_ERRORS.PASSWORD_MISMATCH,
      });
    } else if (validatePassword(password)) {
      let pass = '';
      generateHash(password)
        .then((hash: string) => {
          pass = hash;
          return connect();
        })
        .then(() => User.findOne({ email }))
        .then((existingUser: any) => {
          if (existingUser) throw new Error(AUTH_ERRORS.EXISTING_EMAIL);
        })
        .then(() => {
          const user = new User({
            email,
            password: pass,
          });
          return user.save();
        })
        .then((user: any) => {
          res.status(200).send({
            status: 200,
            message: SIGNUP_SUCCESS,
            user: {
              userId: user._id,
              email: user.email,
              isOnline: false,
            },
          });
        })
        .catch((err: any) => {
          if (err.message === AUTH_ERRORS.EXISTING_EMAIL) {
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
        message: AUTH_ERRORS.INVALID_PASSWORD,
      });
    }
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
    });
  }
});

export default router;
