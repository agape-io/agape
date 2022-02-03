import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";

import { authenticateToken } from './middleware/auth';
import signinRouter from './api-routes/auth/signin';
import signupRouter from './api-routes/auth/signup';

import profileRouter from './api-routes/users/profile';
import discoverRouter from './api-routes/discover/discover';

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(bodyParser.json());

// auth routers
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

// profile routers
app.use('/profile', authenticateToken, profileRouter);
// discover routers
app.use('/discover', discoverRouter);

app.listen(port, () => {
  console.log(`Agape Server is listening on port ${port}!`);
});
