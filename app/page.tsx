'use client';
import { useContext, useEffect, useState } from 'react';
import Header from '@/components/header';
import { AuthContext } from '@/contexts/authContext';
import { LoadingContext } from '@/contexts/loaderContext';
import { Loader } from '@/components/loader';
import { ICountyVisitsInfo } from '@/lib/types';
import { NotificationContext } from '@/contexts/notificationContext';

export default function Home() {
  const [countries, setCountries] = useState<ICountyVisitsInfo[]>([]);
  const { authenticated } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useContext(NotificationContext);

  const getVisitsData = async () => {
    try {
      const response = await fetch('/api/countries/top', {
        credentials: 'include',
      });
      const data = await response.json();

      setCountries(data.countries as ICountyVisitsInfo[]);
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Can not get visits information', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    setIsLoading(true);
    getVisitsData().finally(() => {
      setIsLoading(false);
    });
  }, [authenticated]);

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      {!authenticated && (
        <div className='flex flex-col justify-center text-center mx-auto mt-10 p-10 font-bold'>
          <p>Welcome to Scratch My Map.</p>
          <p>Please, authenticate to access all features.</p>
        </div>
      )}
      {countries.length &&
        countries.map((c) => (
          <div key={c.name}>
            <div>Name: {c.name}</div>
            <div>Visits: {c.visits}</div>
          </div>
        ))}
    </>
  );
}
