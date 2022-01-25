import { Router, Request, Response } from 'express';

const router = Router();

// TODO: will implement if time permits
// router.post('/google', (req: Request, res: Response) => {
//     // login with google
// });

router.post('/facebook', (req: Request, res: Response) => {
    // login with facebook
});

router.post('/username', (req: Request, res: Response) => {
    // login with username and password
});

export default router;