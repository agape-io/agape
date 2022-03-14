import { Router, Request, Response } from 'express';
import connect from '../../config/db';

import { Chat } from '../../models/chat';
import { User } from '../../models/user';

const router = Router();

/**
 * @api {get} /
 * @apiName Get User Chats
 * @apiGroup Chats
 * @apiDescription Fetch user's chats
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * userId: string
 * 
 * @apiVersion 0.1.0
 */
router.get('/', async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    await connect();
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        const chats = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'profile.name profile.photo email',
        });
        res.status(200).send(chats);
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

/**
 * @api {post} /
 * @apiName Create/Access User Chat
 * @apiGroup Chats
 * @apiDescription Create or access user's chats
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest POST /
 *
 * @query
 * userIds: [string]
 * 
 * @apiVersion 0.1.0
 */
router.post('/', async (req: Request, res: Response) => {
  const { userIds } = req.body;
  if (userIds) {
    await connect();
    const chat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: userIds[0] } } },
        { users: { $elemMatch: { $eq: userIds[1] } } },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage');

    const chats = await User.populate(chat, {
      path: 'latestMessage.sender',
      select: 'profile.name profile.photo email',
    });

    if (chats.length > 0) {
      res.send(chats[0]);
    } else {
      const newChat = {
        chatName: 'sender',
        users: [userIds[0], userIds[1]],
      };
      const createdChat = await Chat.create(newChat);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
      res.status(200).send(fullChat);
    }
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

export default router;
