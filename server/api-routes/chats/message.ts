import { Router, Request, Response } from 'express';
import connect from '../../config/db';

import { Chat } from '../../models/chat';
import { Message } from '../../models/message';
import { User } from '../../models/user';

const router = Router();

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
