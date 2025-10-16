import 'server-only';

import crypto from 'crypto';

export const hashString = (value: string) =>
  crypto
    .createHmac('sha256', process.env.SECRET as string)
    .update(value)
    .digest('hex')
    .toString();

export const verifyHash = (value: string, hashedValue: string) => {
  const hash = hashString(value);
  return hashedValue === hash;
};
