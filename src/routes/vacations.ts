import { getVacationsCount } from '../controllers/vacations.controller'
import express, { Request, Response } from 'express'
import authorizeUser from '../helpers/authorize'

const router = express.Router()


router.get('/users/:userId/vacations', [authorizeUser] ,async (req: Request, res: Response) => {
  getVacationsCount(req, res)
});

export default router;
