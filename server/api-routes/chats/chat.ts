import { Router, Request, Response } from 'express';

import connect from '../../config/db';
import { DEFAULT_CHAT_NAME } from '../../config/constants';
import { MISSING_FIELDS, UNKNOWN_ERROR } from '../../config/errorMessages';

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
router.get('/', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    connect()
      .then(() => Chat.find({
        users: { $elemMatch: { $eq: userId } },
      }).populate('users', 'profile preferences.sexuality email isOnline')
        .populate('latestMessage')
        .sort({ updatedAt: -1 }))
      .then((results: any) => User.populate(results, {
        path: 'latestMessage.sender',
        select: 'profile.name profile.photo email',
      }))
      .then((chats: any) => res.status(200).send(chats))
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
router.post('/', (req: Request, res: Response) => {
  const { userIds } = req.body;
  if (userIds) {
    connect()
      .then(() => Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: userIds[0] } } },
          { users: { $elemMatch: { $eq: userIds[1] } } },
        ],
      }).populate('users', 'profile preferences.sexuality email isOnline')
        .populate('latestMessage'))
      .then((chat: any) => User.populate(chat, {
        path: 'latestMessage.sender',
        select: 'profile.name profile.photo email',
      }))
      .then((chats: any) => {
        if (chats.length > 0) {
          res.send(chats[0]);
          return null;
        }
        const newChat = {
          chatName: DEFAULT_CHAT_NAME,
          users: [userIds[0], userIds[1]],
        };
        return Chat.create(newChat);
      })
      .then((createdChat: any) => {
        if (createdChat) return Chat.findOne({ _id: createdChat._id }).populate('users', 'profile preferences.sexuality email isOnline');
      })
      .then((fullChat: any) => res.status(200).send(fullChat))
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
