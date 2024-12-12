import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.sendStatus(404);
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.sendStatus(401);
        }

        const newUser = await User.create({
             username, 
             password
             });
}

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
