import { Router, Request, Response } from 'express';

import { Chat } from "../../models/chat";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (userId) {
        const isChat = await Chat.find({
            $and: [
                { users: { elemMatch: { $eq: req.body.userId } } },
                { users: { elemMatch: { $eq: userId } } }
            ]
        })
    } else {
        res.status(500).send({
            status: 500,
            message: "Missing User Id!"
        })
    }
});

router.get('/:chatId', (req: Request, res: Response) => {
    // implement get chat by ID
});

export default router;