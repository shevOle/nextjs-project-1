import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/session';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(process.env.COOKIE_NAME as string)?.value;
  console.log(token);
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: payload });
};
