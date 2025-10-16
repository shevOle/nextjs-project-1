import { NextRequest, NextResponse } from 'next/server';
import { getDbClient } from '@/lib/database';
import { verifyJwt } from '@/lib/session';
import { User } from '@/lib/types';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const token = req.cookies.get(process.env.COOKIE_NAME as string)?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyJwt(token) as User;

  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const client = getDbClient();

  const user = await client
    .collection('users')
    .findOne({ email: payload.email });

  if (!user) {
    return NextResponse.json(
      { message: 'Could not find user' },
      { status: 400 }
    );
  }

  const visits = await client
    .collection('countryVisits')
    .countDocuments({ userId: user._id });

  return NextResponse.json({ visits });
};
