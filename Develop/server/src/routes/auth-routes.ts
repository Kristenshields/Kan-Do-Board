import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


const router = Router();

export const login = async (req: Request, res: Response) => {
    // TODO: If the user exists and the password is correct, return a JWT token

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }


    try {
        const userInfo = await User.findOne({ where: { username } });
        console.log('User Info:', userInfo);
        if (!userInfo) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        const valid = await bcrypt.compare(password, userInfo.password);
        console.log('Password from DB:', userInfo.password);
        console.log('Password from Request:', password);

        if (!valid) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: userInfo.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
        console.log('Token Payload:', { id: userInfo.id });
        return res.status(200).json({ message: 'Successful', token });
    } catch (error) {
        console.error('Failed to login:', error);
        if (error instanceof Error) {
            console.error('Global Error:', error.stack);
        } else {
            console.error('Global Error:', error);
        }
        return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};




// POST /login - Login a user
router.post('/login', login);

export default router;
