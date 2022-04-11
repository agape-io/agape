import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import adminSubscriptionRouter from './api-routes/admin/subscription';

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
import subscriptionRouter from './api-routes/users/subscription';

import { env } from './config/env';

import { authenticateToken, authenticateAdmin } from './middleware/auth';
import { notFound, errorHandler } from './middleware/error';

const app = express();
const { ENDPOINT, PORT } = env;
const api_version = "/api/v1";

// CORS Middleware
app.use(cors());

// Parse JSON body middelware
app.use(bodyParser.json());

// auth routers
app.use(`${api_version}/signin`, signinRouter);
app.use(`${api_version}/signup`, signupRouter);
app.use(`${api_version}/signout`, signoutRouter);

// chat routes
app.use(`${api_version}/chats`, authenticateToken, chatRouter);
app.use(`${api_version}/messages`, authenticateToken, messageRouter);

// user routes
app.use(`${api_version}/discover`, authenticateToken, discoverRouter);
app.use(`${api_version}/preferences`, authenticateToken, preferencesRouter);
app.use(`${api_version}/profile`, authenticateToken, profileRouter);
app.use(`${api_version}/settings`, authenticateToken, settingsRouter);
app.use(`${api_version}/swipe`, authenticateToken, swipeRouter);
app.use(`${api_version}/subscription`, authenticateToken, subscriptionRouter);

// admin subscription routes
app.use(`${api_version}/admin/subscription`, authenticateAdmin, adminSubscriptionRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Agape Server is listening on port ${PORT}!`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: ENDPOINT,
  },
});

io.on('connection', (socket: any) => {
  console.log('connected to socket.io');

  socket.on('setup', (userId: string) => {
    socket.join(userId);
    socket.emit('connected');
  });

  socket.on('join chat', (room: string) => {
    socket.join(room);
    console.log(`User joined chat: ${room}`);
  });

  socket.on('new message', (newMessageRecieved: any) => {
    const { chat } = newMessageRecieved;
    if (!chat.users) return console.log('chat.users not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.on('typing', (room: string) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room: string) => socket.in(room).emit('stop typing'));

  socket.off('setup', () => {
    // @ts-ignore
    // userId is initialized in the socket.on("setup") event
    socket.leave(userId);
  });
});
