import { Router, Request, Response } from 'express';

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
    // write code that gets the profile of a given user
});

router.post('/create', async (req: Request, res: Response) => {
    // write code that creates the profile for a given user
});

router.post('/update', async (req: Request, res: Response) => {
    // write code that updates the profile for a given user 
});

export default router;
