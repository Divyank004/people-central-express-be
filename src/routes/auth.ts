import {authenticate, register} from '../controllers/auth.controller'
import express, { Request, Response } from 'express'

const router = express.Router()

/* login */
router.post('/login', async function(req: Request, res: Response) {
  authenticate(req, res)
});

router.post('/register', async (req, res) => {
  register(req, res)
});

export default router;
