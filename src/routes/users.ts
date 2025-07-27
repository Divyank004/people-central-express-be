import { getUser } from '../controllers/user.controller'
import express, { Request, Response } from 'express'
import authorizeUser from '../helpers/authorize'

const router = express.Router()


router.get('/users/:userId', [authorizeUser] ,async (req: Request, res: Response) => {
  getUser(req, res)
});

export default router;
