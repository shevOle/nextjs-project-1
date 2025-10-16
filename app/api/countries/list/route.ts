import { NextRequest, NextResponse } from 'next/server';
import { getDbClient } from '@/lib/database';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const client = getDbClient();
  const countries = await client
    .collection('countries')
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return NextResponse.json({ countries });
};
