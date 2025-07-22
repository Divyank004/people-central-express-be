import { Request, Response } from 'express'
import argon2 from 'argon2'
import db from '../models/db'
import jwt from 'jsonwebtoken'


async function register(req: Request, res: Response)
 {
    const { username, password } = req.body;
    try{
        // Hash the password
        const hashedPassword = await argon2.hash(password);
        // Store the new user   
        await db.insert('user', {
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
        // TODO perform input validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await db.select(['name', 'username', 'id', 'password'])
            .from('user')
            .where({ username })
            .first();
        if (!user) {
            throw new Error('User does not exist. Please register.');
        }

        const verified: boolean = await argon2.verify(user.password, password);
        if (!verified) {
            throw new Error('Invalid credentials');
        }

        const payload = { userId: user.id, username: user.username, name: user.name };
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        const access_token = jwt.sign(payload, jwtSecret, {
            expiresIn: '4h'
        });
        res.json({access_token})
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { register, authenticate }