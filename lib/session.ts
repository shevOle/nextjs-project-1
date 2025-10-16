import 'server-only';

import jwt from 'jsonwebtoken';
import { User } from '@/lib/types';

export const createJwt = (userData: User) => {
  const payload = {
    email: userData.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyJwt = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string);
