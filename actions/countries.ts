import { getDbClient } from '@/lib/database';

export const getAllCountries = async () => {
  const client = getDbClient();

  return client
    .collection('countries')
    .find({}, { projection: { _id: -1 } })
    .toArray();
};

export const getTopVisitedCounties = async (quantity: number = 10) => {
  const client = getDbClient();

  return client
    .collection('countryVisits')
    .aggregate([
      {
        $group: {
          _id: '$countryId',
          visits: { $count: {} },
        },
      },
      { sort: { visits: -1 } },
      { limit: quantity },
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
};
