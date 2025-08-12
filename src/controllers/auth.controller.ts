import { Request, Response } from 'express'
import argon2 from 'argon2'
import db from '../models/db'
import jwt from 'jsonwebtoken'
import HttpStatusCodes from '../helpers/httpStatusCodes'

async function register(req: Request, res: Response)
 {
    const { username, password } = req.body;
    try{
        const hashedPassword = await argon2.hash(password);  
        await db.insert('users', {
            username,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

async function authenticate(req: Request, res: Response)
 {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Username and password are required' });
        }
        const user = await db.select(['username', 'users.id as user_id', 'password'])
            .from('users')
            .where({ username })
            .first();
        
        if (!user) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'User does not exist. Please register.'});
        }

        const verified: boolean = await argon2.verify(user.password, password);
        if (!verified) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials'});
        }
        const payload = { 
            userId: user.user_id, 
            userName: user.username, 
        };
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        const access_token = jwt.sign(payload, jwtSecret, {
            expiresIn: '4h'
        });
        res.json({access_token, userId: user.user_id});
    } catch(e) {
        console.error(e);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export { register, authenticate }