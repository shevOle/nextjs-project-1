'use client';

import { useContext, useEffect, useState, useMemo } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { LoadingContext } from '@/contexts/loaderContext';

export default function Home() {
  const [myVisits, setMyVisits] = useState(0);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    const target = document.getElementById('map')!;

    new Map({
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      target,
      controls: [],
    });

    fetch('/api/countries/visited-by-me', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setMyVisits(data.visits))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const statEl = useMemo(() => {
    let elementText: string;

    if (myVisits === 0) {
      elementText =
        'You need to start somewhere. Come on, look at the map and pick a country to go to!';
    } else if (myVisits < 5) {
      elementText = `That is a start, keep going! You have visited <strong>${myVisits}</strong> countries by now.`;
    } else {
      elementText = `Wow! <strong>${myVisits}</strong> visited countries?! Are you travelling TV-show host?`;
    }

    return <div className='text-center text-xl'>{elementText}</div>;
  }, [myVisits]);

  return (
    <>
      <div id='map' className='w-[80vw] h-[50vh] mx-auto overflow-hidden'></div>
      {statEl}
    </>
  );
}
