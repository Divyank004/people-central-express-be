import { getVacationsCount } from '../controllers/vacations.controller'
import express from 'express'
import authorizeUser from '../helpers/authorize'

const router = express.Router()

router.get('/users/:userId/vacations', [authorizeUser] , getVacationsCount);

export default router;
