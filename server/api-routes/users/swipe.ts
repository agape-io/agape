import { Router, Request, Response } from 'express';

import { User } from "../../models/user";
import connect from "../../config/db";

const router = Router();

router.get('/left', async (req: Request, res: Response) => {

});

router.get('/right', async (req: Request, res: Response) => {

});

export default router;