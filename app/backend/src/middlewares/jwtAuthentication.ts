import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret:jwt.Secret = process.env.JWT_SECRET as string;

const jwtAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.body.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default jwtAuthentication;
