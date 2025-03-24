import { useEffect, useState } from 'react';
import { getUserTop, TopType } from '../logic/getUserTop';
import { SpotifyArtist } from '../constants/spotify';

export function useGetArtistsPopularity() {
  const [popularity, setPopularity] = useState<number>(0);

  useEffect(() => {
    getUserTop({ type: TopType.ARTIST, limit: 50 }).then((response) => {
      const topTracks = response.items as SpotifyArtist[];
      if (!!topTracks) {
        var totalPop = 0;
        topTracks.map((track) => {
          totalPop += track.popularity;
        });
        setPopularity(totalPop / 50);
      }
    });
  }, []);

  return popularity;
}
