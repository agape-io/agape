import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    // implement get all chats
});

router.get('/:chatId', (req: Request, res: Response) => {
    // implement get chat by ID
});

export default router;