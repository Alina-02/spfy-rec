import { useRef, useState } from 'react';
import { Settings, SpotifyGenre } from '../constants/spotify';
import { Divider, Icon, Stack } from '@mui/material';
import RequestSongForm from '../components/RequestSongForm';
import { spotifyGenres } from '../constants/genres';
import CardAlbumInfo from '../components/InfoCards/CardAlbumInfo';
import CardSongInfo from '../components/InfoCards/CardSongInfo';
import CardArtisInfo from '../components/InfoCards/CardArtistInfo';
import DisplayMusicDemo from '../components/Discs/DisplayMusicDemo';
import DisplayAlbumDisc from '../components/Discs/DisplayAlbumDisc';
import { Colors } from '../constants/colors';

const Main = () => {
  const genres: SpotifyGenre[] = spotifyGenres;
  const [selectedGenre, setSelectedGenre] = useState<SpotifyGenre>(
    spotifyGenres[1]
  );

  const [settings, setSettings] = useState<Settings>(Settings.TRACK);
  const [recommendation, setRecommendation] = useState<any>(null);

  console.log(recommendation, 'recomendación');

  return (
    <Stack direction="row" height="100%">
      <Stack width="350px" mx={2} my={1} spacing={2} overflow={'auto'}>
        <RequestSongForm
          selectedGenre={selectedGenre}
          setRecommendation={setRecommendation}
          genres={genres}
          setSelectedGenre={setSelectedGenre}
          settings={settings}
          setSettings={setSettings}
        />
        <Stack overflow={'hidden'}>
          {recommendation && settings === Settings.TRACK && (
            <CardSongInfo recommendation={recommendation} />
          )}
          {recommendation && settings === Settings.ALBUM && (
            <CardAlbumInfo recommendation={recommendation} />
          )}
          {recommendation && settings === Settings.ARTIST && (
            <CardArtisInfo recommendation={recommendation} />
          )}
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        width="calc(100% - 350px)"
        overflow={'hidden'}
        sx={{ backgroundColor: `${Colors.BLACK_SPOTIFY}` }}
      >
        {recommendation && settings === Settings.TRACK && (
          <DisplayMusicDemo recommendation={recommendation} />
        )}
        {settings === Settings.ALBUM && (
          <DisplayAlbumDisc recommendation={recommendation} />
        )}
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
