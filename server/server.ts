import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";
import cors from 'cors';
import { env } from './config/env';

import { authenticateToken } from './middleware/auth';
import signinRouter from './api-routes/auth/signin';
import signupRouter from './api-routes/auth/signup';
import signoutRouter from './api-routes/auth/signout';

import chatRouter from './api-routes/chats/chat';

import profileRouter from './api-routes/users/profile';
import discoverRouter from './api-routes/users/discover';
import preferencesRouter from './api-routes/users/preferences';
import settingsRouter from './api-routes/users/settings';
import swipeRouter from './api-routes/users/swipe';

import { notFound, errorHandler } from './middleware/error';

const app = express();
const { PORT } = env;

// Allow profile photos to be accessible to the client
app.use('/uploads', express.static('./api-routes/users/uploads'));

// CORS Middleware
app.use(cors());

app.use(passport.initialize());
app.use(bodyParser.json());

// auth routers
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);

// profile routers
app.use('/profile', authenticateToken, profileRouter);
// discover routers
app.use('/discover', authenticateToken, discoverRouter);
// user preferences router
app.use('/preferences', authenticateToken, preferencesRouter);
// settings routers
app.use('/settings', authenticateToken, settingsRouter);
// swipe router
app.use('/swipe', authenticateToken, swipeRouter);


// profile routers
app.use('/profile', authenticateToken, profileRouter);
// discover routers
app.use('/discover', authenticateToken, discoverRouter);

// chat routes
app.use('/chats', authenticateToken, chatRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Agape Server is listening on port ${PORT}!`);
});
