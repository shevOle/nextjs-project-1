import { NextRequest, NextResponse } from 'next/server';

// export const config = {
//   matcher: '/countries/:path*',
// };

export default function middleware(request: NextRequest) {
  const jwt = request.cookies.get(process.env.COOKIE_NAME as string);
  console.log('jwt', jwt);
  if (!jwt) {
    // Respond with JSON indicating an error message
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
