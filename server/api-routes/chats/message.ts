import { Router, Request, Response } from 'express';
import connect from '../../config/db';

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
router.post('/', async (req: Request, res: Response) => {
  const { userId, content, chatId } = req.body;
  if (userId && content && chatId) {
    await connect();
    const newMessage = {
      sender: userId,
      content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    message = await message.populate('sender', 'profile.photo profile.name');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'profile.name profile.pic email',
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.status(201).send(message);
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id or Content or ChatId!',
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
router.get('/', async (req: Request, res: Response) => {
  const { chatId } = req.query;
  if (chatId) {
    await connect();
    const messages = await Message.find({
      chat: chatId,
    })
      .populate('sender', 'profile.name profile.photo email')
      .populate('chat');
    res.status(200).send(messages);
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing Chat Id!',
    });
  }
});
export default router;
