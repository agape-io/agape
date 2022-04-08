import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';

import { Chat } from '../../models/chat';
import { Message } from '../../models/message';
import { User } from '../../models/user';

const router = Router();

/**
 * @api {post} /
 * @apiName Send Message to Chat
 * @apiGroup Chats
 * @apiDescription Send user's message to chat
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /
 *
 * @query
 * userId: string
 * content: string
 * chatId: string
 *
 * @apiVersion 0.1.0
 */
router.post('/', (req: Request, res: Response) => {
  const { userId, content, chatId } = req.body;
  if (userId && content && chatId) {
    connect()
      .then(() => {
        const newMessage = {
          sender: userId,
          content,
          chat: chatId,
        };
        return Message.create(newMessage);
      })
      .then((message: any) => message.populate('sender', 'profile.photo profile.name'))
      .then((messageWithSender: any) => messageWithSender.populate('chat'))
      .then((messageWithChat: any) => User.populate(messageWithChat, {
        path: 'chat.users',
        select: 'profile.name profile.photo email',
      }))
      .then((completeMessage: any) => {
        res.status(201).send(completeMessage);
        return Chat.findByIdAndUpdate(chatId, {
          latestMessage: completeMessage,
        });
      })
      .catch((err: any) => {
        console.error(err);
        res.status(500).send({
          status: 500,
          message: UNKNOWN_ERROR,
        });
      });
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
    });
  }
});

/**
 * @api {get} /
 * @apiName Get Chat Messages
 * @apiGroup Chats
 * @apiDescription Fetch all messages in chat
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * chatId: string
 *
 * @apiVersion 0.1.0
 */
router.get('/', (req: Request, res: Response) => {
  const { chatId } = req.query;
  if (chatId) {
    connect()
      .then(() => Message.find({
        chat: chatId,
      }).populate('sender', 'profile.name profile.photo email')
        .populate('chat'))
      .then((messages: any) => {
        res.status(200).send(messages);
      })
      .catch((err: any) => {
        console.error(err);
        res.status(500).send({
          status: 500,
          message: UNKNOWN_ERROR,
        });
      });
  } else {
    res.status(400).send({
      status: 400,
      message: MISSING_FIELDS,
    });
  }
});
export default router;
