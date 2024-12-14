import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

try {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const decoded = jwt.verify(token, secretKey) as JwtPayload;

   req.user = {
    username: decoded.username,
  };

  return next();
} catch (error) {
  console.error('Failed to authenticate token:', error);
  return res.status(403).json({ message: 'Forbidden' });
}
};
    
    
   
