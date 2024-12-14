import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    
    const { username, password } = req.body;

    try {
    const userInfo = await User.findOne({ where: { username } });
    if (!userInfo) {
        return res.status(404).json({ message: 'Invalid username or password' });
    }

    const valid = await bcrypt.compare(password, userInfo.password);
    if (!valid) {
        return res.status(404).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Unsuccessful', token });
} catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
}
};



const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
