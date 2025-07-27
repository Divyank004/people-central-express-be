import { Request, Response } from 'express'
import db from '../models/db'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../types/user'
import HttpStatusCodes from '../helpers/httpStatusCodes'

async function authorizeUser(req: Request, res: Response, next: Function)
 {
    const authHeader = req.get('Authorization') || '';
    try {
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Access token is required' });
        }
        const access_token = authHeader.split(" ")[1];
       
        if (!access_token) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Access token is required' });
        }
        const reqUser: JWTPayload = jwt.verify(access_token, process.env.JWT_SECRET || '') as JWTPayload;
        const user = await db.select(['users.name', 'username', 'users.id as user_id'])
            .from('users')
            .where({ 'users.id': reqUser.userId, 'username': reqUser.userName })
            .first();
        if (user.length === 0) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized access' });
        }
        next();
    } catch(e) {
        console.error(e);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export default authorizeUser;