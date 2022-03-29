import { Router, Request, Response } from 'express';
import connect from '../../config/db';

import { Notification } from '../../models/notifications';
import { User } from '../../models/user';

const router = Router();

/**
 * @api {post} /
 * @apiName Send Notificaton
 * @apiGroup Chats
 * @apiDescription Send notification
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest POST /
 *
 * @query
 * chatId: string
 * userId: string
 * text: string
 *
 * @apiVersion 0.1.0
 */
router.post('/', async (req: Request, res: Response) => {
  const { chatId, userId, text } = req.body;
  if (chatId && userId && text) {
    await connect();
    const newNotification = {
      chat: chatId,
      user: userId,
      text,
      read: false,
    };
    let notification = await Notification.create(newNotification);
    notification = await notification.populate('chat');
    notification = await User.populate(notification, {
      path: 'chat.users',
      select: 'profile.name',
    });
    res.status(201).send(notification);
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing ChatId or Text!',
    });
  }
});

/**
 * @api {put} /
 * @apiName Read Notification
 * @apiGroup Chats
 * @apiDescription Read notification
 *
 * @apiSuccess (201)
 *
 * @apiSampleRequest PUT /
 *
 * @query
 * notificationId: string
 *
 * @apiVersion 0.1.0
 */
router.put('/read', async (req: Request, res: Response) => {
  const { notificationId } = req.body;
  if (notificationId) {
    await connect();
    await Notification.findByIdAndUpdate(notificationId, { read: true })
      .then(() => {
        res.status(201).send();
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing NotificationId!',
    });
  }
});

/**
 * @api {get} /
 * @apiName Get Notifications
 * @apiGroup Chats
 * @apiDescription Fetch all notifications for a user
 *
 * @apiSuccess (200)
 *
 * @apiSampleRequest GET /
 *
 * @query
 * userId: string
 * all: boolean
 *
 * @apiVersion 0.1.0
 */
router.get('/', async (req: Request, res: Response) => {
  const { userId, all = false } = req.query;
  if (userId) {
    await connect();
    await Notification.find({
      users: { $elemMatch: { $eq: userId } },
      user: userId,
    })
      .populate('chat')
      .then((results) => {
        const notifs = results.filter((notif) => {
          if (all) return true;
          if (!notif.read) return true;
          return false;
        });
        res.status(200).send(notifs);
      });
  } else {
    res.status(500).send({
      status: 500,
      message: 'Missing User Id!',
    });
  }
});

export default router;
