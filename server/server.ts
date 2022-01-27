import express from 'express';
import signinRouter from './api-routes/auth/signin';
import signupRouter from './api-routes/auth/signup';

import passport from "passport";

const app = express();
const port = 3000;

app.use(passport.initialize());

// signin/signup routers
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
  console.log(`Agape Server is listening on port ${port}!`);
});
