import { useEffect, useState } from 'react';
import { getUserTop, TopType } from '../logic/getUserTop';
import { SpotifyTrack } from '../constants/spotify';

export function useGetTracksPopularity() {
  const [popularity, setPopularity] = useState<number>(0);

  useEffect(() => {
    getUserTop({ type: TopType.TRACKS, limit: 50 }).then((response) => {
      const topTracks = response.items as SpotifyTrack[];
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
