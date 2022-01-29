import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { env } from '../../config/env';
import connect from '../../config/db';
import strategy from 'passport-facebook';
import passwordValidator from 'password-validator';
import { UserModel } from "../../models/user";

const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces();

// const FacebookStrategy = strategy.Strategy;

// const { Facebook } = env;

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: Facebook.ClientId,
//             clientSecret: Facebook.ClientSecret,
//             callbackURL: Facebook.CallbackUrl,
//             profileFields: ["email", "name"]
//         },
//         function (accessToken, refreshToken, profile, done) {
//             const { email, first_name, last_name } = profile._json;
//             const userData = {
//                 email,
//                 firstName: first_name,
//                 lastName: last_name
//             };
//             done(null, profile);
//         }
//     )
// );

const router = Router();

// TODO: will implement if time permits
// router.post('/google', (req: Request, res: Response) => {
//     // login with google
// });

// TODO: will implement if time permits
// router.post('/facebook', passport.authenticate("facebook"));


router.post('/email', async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        if (schema.validate(req.body.password, { details: true })) {
            await connect();
            const userModel = mongoose.model('UserModel', UserModel);
            const user = new userModel({
                email: req.body.email,
                password: req.body.password,
            });
            user.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result)
                }
            })
        } else {
            throw new Error('Error: Invalid password!')
        }
    }
});

export default router;
