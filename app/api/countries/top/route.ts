import { NextRequest, NextResponse } from 'next/server';
import { getDbClient } from '@/lib/database';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const client = getDbClient();

  const countries = await client
    .collection('countryVisits')
    .aggregate([
      {
        $group: {
          _id: '$countryId',
          visits: { $count: {} },
        },
      },
      {
        $lookup: {
          from: 'countries',
          localField: '_id',
          foreignField: '_id',
          as: 'countryData',
        },
      },
      { $unwind: '$countryData' },
      {
        $project: {
          _id: 0,
          visits: 1,
          name: '$countryData.name',
        },
      },
    ])
    .toArray();
  return NextResponse.json({ countries });
};
