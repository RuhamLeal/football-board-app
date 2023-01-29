import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret:jwt.Secret = process.env.JWT_SECRET as string;

export default function generateToken(userId: number): string {
  const data = { userId };

  const token = jwt.sign(
    data,
    jwtSecret,
    { expiresIn: '6h', algorithm: 'HS256' },
  );

  return token;
}
