import { Router, Request, Response } from 'express';
import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";

const FacebookStrategy = strategy.Strategy;

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ["email", "name"]
        },
        function (accessToken, refreshToken, profile, done) {
            const { email, first_name, last_name } = profile._json;
            const userData = {
                email,
                firstName: first_name,
                lastName: last_name
            };
            done(null, profile);
        }
    )
);

const router = Router();

// TODO: will implement if time permits
// router.post('/google', (req: Request, res: Response) => {
//     // login with google
// });

router.post('/facebook', passport.authenticate("facebook"), (req: Request, res: Response) => {
    // login with facebook
});

router.post('/username', (req: Request, res: Response) => {
    // login with username and password
});

export default router;
