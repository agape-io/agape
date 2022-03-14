import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { env } from './config/env';

import signinRouter from './api-routes/auth/signin';
import signupRouter from './api-routes/auth/signup';
import signoutRouter from './api-routes/auth/signout';
import discoverRouter from './api-routes/users/discover';
import preferencesRouter from './api-routes/users/preferences';
import profileRouter from './api-routes/users/profile';
import settingsRouter from './api-routes/users/settings';
import swipeRouter from './api-routes/users/swipe';
import chatRouter from './api-routes/chats/chat';
import messageRouter from './api-routes/chats/message';

import { authenticateToken } from './middleware/auth';
import { notFound, errorHandler } from './middleware/error';

const app = express();
const { PORT } = env;

// CORS Middleware
app.use(cors());

// Parse JSON body middelware
app.use(bodyParser.json());

// auth routers
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);

// chat routes
app.use('/chats', authenticateToken, chatRouter);
app.use('/messages', authenticateToken, messageRouter);

// user routes
app.use('/discover', authenticateToken, discoverRouter);
app.use('/preferences', authenticateToken, preferencesRouter);
app.use('/profile', authenticateToken, profileRouter);
app.use('/settings', authenticateToken, settingsRouter);
app.use('/swipe', authenticateToken, swipeRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Agape Server is listening on port ${PORT}!`);
});
