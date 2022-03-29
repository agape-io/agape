import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

import { User } from '../../models/user';
import connect from '../../config/db';

const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

const router = Router();

/**
 * @api {post} /email
 * @apiName Signup via Email
 * @apiGroup Auth
 * @apiDescription Signup user using email and password
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
router.post('/email', async (req: Request, res: Response) => {
  const { email, password, verifyPassword } = req.body;
  if (email && password && verifyPassword) {
    const errorDetails = schema.validate(password, { details: true });
    if ((errorDetails as []).length === 0) {
      const saltRounds = 10;
      await bcrypt.genSalt(saltRounds, async (err, salt) => {
        await bcrypt.hash(password, salt, async (err, hash) => {
          await connect();
          User.findOne({ email }, (err, existingUser) => {
            if (existingUser) {
              res.status(500).send({
                status: 500,
                message: 'Email already exists!',
              });
            } else if (password == verifyPassword) {
              const user = new User({
                email,
                password: hash,
              });
              user.save((err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200).send({
                    status: 200,
                    message: 'User created!',
                    user: {
                      userId: result._id,
                      email: result.email,
                    },
                  });
                }
              });
            } else {
              res.status(500).send({
                status: 500,
                message: 'Passwords do not match!',
              });
            }
          });
        });
      });
    } else {
      res.status(500).send({
        status: 500,
        message: `Invalid password: ${errorDetails}`,
      });
    }
  } else {
    res.status(500).send({
      status: 500,
      error: 'Missing Email or Password!',
    });
  }
});

export default router;
