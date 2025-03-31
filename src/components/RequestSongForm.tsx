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

interface Props {
  selectedGenre: SpotifyGenre;
  setSongInfo: React.Dispatch<any>;
  genres: SpotifyGenre[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<SpotifyGenre>>;
  setRandomGenre: React.Dispatch<any>;
}

const RequestSongForm = ({
  selectedGenre,
  setSongInfo,
  genres,
  setSelectedGenre,
  setRandomGenre,
}: Props) => {
  const [settings, setSettings] = useState<Settings>(Settings.TRACK);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const find = () => {
    obtainANewSpotifyTrackRecomendation(selectedGenre.name, settings).then(
      (genreTrack) => {
        setSongInfo(genreTrack);
      }
    );
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
                    onChange={() => setSettings(Settings.TRACK)}
                  />
                }
                label="Song"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    checked={settings === Settings.ALBUM}
                    onChange={() => setSettings(Settings.ALBUM)}
                  />
                }
                label="Album"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    checked={settings === Settings.ARTIST}
                    onChange={() => setSettings(Settings.ARTIST)}
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
