import { useEffect, useRef, useState } from 'react';
import { SpotifyGenres } from '../constants/spotify';
import getGenres from '../logic/getGenres';
import { Divider, Stack } from '@mui/material';
import CardSongInfo from '../components/CardSongInfo';
import RequestSongForm from '../components/RequestSongForm';
import DisplayMusicDemo from '../components/DisplayMusicDemo';

const Main = () => {
  const [genres, setGenres] = useState<SpotifyGenres[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<SpotifyGenres[]>([
    SpotifyGenres.Electronic,
  ]);
  const [songInfo, setSongInfo] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getGenres().then((res) => setGenres(res));
  }, []);

  const setRandomGenre = () => {
    const genres = Object.values(SpotifyGenres); // Get all enum values
    const randomIndex = Math.floor(Math.random() * genres.length); // Generate a random index
    setSelectedGenre([genres[randomIndex]]);
  };

  return (
    <Stack direction="row" height="100%">
      <Stack width="350px" m={2} spacing={2}>
        <RequestSongForm
          selectedGenre={selectedGenre}
          setSongInfo={setSongInfo}
          genres={genres}
          setSelectedGenre={setSelectedGenre}
          setRandomGenre={setRandomGenre}
          audioRef={audioRef}
        />
        <Stack overflow={'hidden'}>
          {songInfo && <CardSongInfo songInfo={songInfo} />}
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack width="calc(100% - 350px)" overflow={'hidden'}>
        <DisplayMusicDemo songInfo={songInfo} audioRef={audioRef} />
      </Stack>
    </Stack>
  );
};

export default Main;
