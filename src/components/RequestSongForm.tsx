import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { obtainANewSpotifyTrackRecomendation } from '../logic/getRandomSongByGenre';
import { Settings, SpotifyGenre } from '../constants/spotify';
import { Colors } from '../constants/colors';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SettingsIcon from '@mui/icons-material/Settings';
import PopularityStats from './PopularityStats';
import { spotifyGenres } from '../constants/genres';

interface Props {
  selectedGenre: SpotifyGenre;
  setRecommendation: React.Dispatch<any>;
  genres: SpotifyGenre[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<SpotifyGenre>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const RequestSongForm = ({
  selectedGenre,
  setRecommendation,
  genres,
  setSelectedGenre,
  settings,
  setSettings,
}: Props) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const find = () => {
    obtainANewSpotifyTrackRecomendation(selectedGenre.name, settings).then(
      (genreTrack) => {
        setRecommendation(genreTrack);
      }
    );
  };

  const setRandomGenre = () => {
    const genres = Object.values(spotifyGenres); // Get all enum values
    const randomIndex = Math.floor(Math.random() * genres.length); // Generate a random index
    setSelectedGenre(genres[randomIndex]);
  };

  return (
    <Stack spacing={2} px={2}>
      <Typography
        sx={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '55px',
        }}
      >
        randON
      </Typography>
      <PopularityStats />
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        m={2}
        spacing={1}
      >
        <Autocomplete
          options={genres}
          value={selectedGenre}
          onChange={(_event, newValue) => {
            setSelectedGenre(newValue as SpotifyGenre);
          }}
          getOptionLabel={(genre: SpotifyGenre) => genre.name}
          fullWidth
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Genres"
              size="small"
              sx={{
                color: `${Colors.BLACK_SPOTIFY}`,
                borderColor: `${Colors.BLACK_SPOTIFY}`,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', // Custom border-radius for the input field
                },
              }}
            />
          )}
        />

        <Stack direction="row">
          <Tooltip title={'Randomize'}>
            <IconButton color="secondary" onClick={setRandomGenre}>
              <ShuffleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={'More settings'}>
            <IconButton
              color="secondary"
              onClick={() => {
                setShowSettings(!showSettings);
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {showSettings && (
        <Stack direction="row" justifyContent="center">
          <FormGroup>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    checked={settings === Settings.TRACK}
                    onChange={() => {
                      setSettings(Settings.TRACK);
                      setRecommendation(null);
                    }}
                  />
                }
                label="Song"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    checked={settings === Settings.ALBUM}
                    onChange={() => {
                      setSettings(Settings.ALBUM);
                      setRecommendation(null);
                    }}
                  />
                }
                label="Album"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    checked={settings === Settings.ARTIST}
                    onChange={() => {
                      setSettings(Settings.ARTIST);
                      setRecommendation(null);
                    }}
                  />
                }
                label="Artist"
              />
            </RadioGroup>
          </FormGroup>
        </Stack>
      )}
      <Stack mx={2}>
        <Button
          variant="contained"
          size="medium"
          sx={{
            padding: 1,
            borderRadius: '10px',
            fontSize: '15px',
          }}
          onClick={find}
          fullWidth
        >
          Find
        </Button>
      </Stack>
    </Stack>
  );
};

export default RequestSongForm;
