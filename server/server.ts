import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";

import signinRouter from './api-routes/auth/signin';
import signupRouter from './api-routes/auth/signup';

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(bodyParser.json());

// signin/signup routers
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
  console.log(`Agape Server is listening on port ${port}!`);
});
