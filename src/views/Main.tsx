import { useRef, useState } from 'react';
import { SpotifyGenre } from '../constants/spotify';
import { Divider, Icon, Stack } from '@mui/material';
import CardSongInfo from '../components/CardSongInfo';
import RequestSongForm from '../components/RequestSongForm';
import DisplayMusicDemo from '../components/DisplayMusicDemo';
import { spotifyGenres } from '../constants/genres';

const Main = () => {
  //const [genres, setGenres] = useState<SpotifyGenres[]>([]);
  const genres: SpotifyGenre[] = spotifyGenres;
  const [selectedGenre, setSelectedGenre] = useState<SpotifyGenre>(
    spotifyGenres[1]
  );

  const [songInfo, setSongInfo] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /*useEffect(() => {
    getGenres().then((res) => {
      (res, 'hola');
      setGenres(res);
    });
  }, []);*/

  const setRandomGenre = () => {
    const genres = Object.values(spotifyGenres); // Get all enum values
    const randomIndex = Math.floor(Math.random() * genres.length); // Generate a random index
    setSelectedGenre(genres[randomIndex]);
  };

  return (
    <Stack direction="row" height="100%">
      <Stack width="350px" mx={2} my={1} spacing={2} overflow={'auto'}>
        <RequestSongForm
          selectedGenre={selectedGenre}
          setSongInfo={setSongInfo}
          genres={genres}
          setSelectedGenre={setSelectedGenre}
          setRandomGenre={setRandomGenre}
        />
        <Stack overflow={'hidden'}>
          {songInfo && <CardSongInfo songInfo={songInfo} />}
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack width="calc(100% - 350px)" overflow={'hidden'}>
        <DisplayMusicDemo songInfo={songInfo} audioRef={audioRef} />
      </Stack>

      <Icon
        sx={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          top: 10,
          right: 10,
        }}
      >
        <img src="/public/spotify_logo/Primary_Logo_Green_CMYK.svg" />
      </Icon>
    </Stack>
  );
};

export default Main;
