import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import getRandomSongByGenre from '../logic/getRandomSongByGenre';
import {
  SpotifyGenres,
  GetSongSettings,
  SpotifyGenre,
} from '../constants/spotify';
import { Colors } from '../constants/colors';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  selectedGenre: SpotifyGenre;
  setSongInfo: React.Dispatch<any>;
  genres: SpotifyGenre[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<SpotifyGenre>>;
  setRandomGenre: React.Dispatch<any>;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const initialGetSongSettings = {
  exclude_saved_albums: true,
  exclude_saved_playlist: true,
  exclude_saved_artist: true,
  exclude_saved_tracks: true,
  restrict_genre: true,
};

const RequestSongForm = ({
  selectedGenre,
  setSongInfo,
  genres,
  setSelectedGenre,
  setRandomGenre,
  audioRef,
}: Props) => {
  const [songSettings, setSongSettings] = useState<GetSongSettings>(
    initialGetSongSettings
  );

  const findSong = () => {
    getRandomSongByGenre(selectedGenre, songSettings).then((res) => {
      // Prepare the song information
      setSongInfo(res);
      audioRef.current?.pause();
      if (audioRef?.current?.currentTime) audioRef.current.currentTime = 0;
    });
  };

  /*const changeSelectedGenre = (e, newValue) => {
    setSelectedGenre(newValue);
    console.log(selectedGenre);
  };*/

  return (
    <Stack spacing={2} px={2}>
      <Typography
        sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '55px' }}
      >
        randON
      </Typography>
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
            <IconButton color="secondary" onClick={setRandomGenre}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {/*<Stack>
        <FormGroup>
          <Accordion
            sx={{
              width: '100%',
              borderRadius: '25px', // Border-radius for closed state
              '&:last-of-type': {
                borderBottomLeftRadius: '25px', // Override default MUI styles
                borderBottomRightRadius: '25px',
              },
              '&.Mui-expanded': {
                borderRadius: '10px', // Border-radius when expanded
                '&:last-of-type': {
                  borderBottomLeftRadius: '10px', // Ensure it applies when expanded
                  borderBottomRightRadius: '10px',
                },
              },
              '&::before': {
                backgroundColor: `rgba(30, 215, 96, 0)`,
              },
            }}
          >
            <AccordionDetails>
              <Grid2 container>
                <Grid2 size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={songSettings.exclude_saved_albums}
                        checked={songSettings.exclude_saved_albums}
                        size="small"
                        onChange={() => {
                          setSongSettings({
                            ...songSettings,
                            exclude_saved_albums:
                              !songSettings.exclude_saved_albums,
                          });
                        }}
                        sx={{
                          color: `${Colors.BLACK_SPOTIFY}`, // Default (unchecked) color
                          '&.Mui-checked': {
                            color: `${Colors.GREEN_SPOTIFY}`, // Checked color
                          },
                          '&.MuiCheckbox-indeterminate': {
                            color: `${Colors.BLACK_SPOTIFY}`, // Indeterminate color
                          },
                          '&:hover': {
                            backgroundColor: `rgba(30, 215, 96, 0.1)`, // Optional hover effect
                          },
                          '&.Mui-disabled': {
                            color: '#BDBDBD', // Disabled color
                          },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '13px',
                      },
                    }}
                    label="Exclude saved albums"
                  />
                </Grid2>
                <Grid2 size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={songSettings.exclude_saved_playlist}
                        checked={songSettings.exclude_saved_playlist}
                        size="small"
                        onChange={() => {
                          setSongSettings({
                            ...songSettings,
                            exclude_saved_playlist:
                              !songSettings.exclude_saved_playlist,
                          });
                        }}
                        sx={{
                          color: `${Colors.BLACK_SPOTIFY}`, // Default (unchecked) color
                          '&.Mui-checked': {
                            color: `${Colors.GREEN_SPOTIFY}`, // Checked color
                          },
                          '&.MuiCheckbox-indeterminate': {
                            color: `${Colors.BLACK_SPOTIFY}`, // Indeterminate color
                          },
                          '&:hover': {
                            backgroundColor: `rgba(30, 215, 96, 0.1)`, // Optional hover effect
                          },
                          '&.Mui-disabled': {
                            color: '#BDBDBD', // Disabled color
                          },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '13px',
                      },
                    }}
                    label="Exclude saved playlist"
                  />
                </Grid2>
                <Grid2 size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={songSettings.exclude_saved_artist}
                        checked={songSettings.exclude_saved_artist}
                        size="small"
                        onChange={() => {
                          setSongSettings({
                            ...songSettings,
                            exclude_saved_artist:
                              !songSettings.exclude_saved_artist,
                          });
                        }}
                        sx={{
                          color: `${Colors.BLACK_SPOTIFY}`, // Default (unchecked) color
                          '&.Mui-checked': {
                            color: `${Colors.GREEN_SPOTIFY}`, // Checked color
                          },
                          '&.MuiCheckbox-indeterminate': {
                            color: `${Colors.BLACK_SPOTIFY}`, // Indeterminate color
                          },
                          '&:hover': {
                            backgroundColor: `rgba(30, 215, 96, 0.1)`, // Optional hover effect
                          },
                          '&.Mui-disabled': {
                            color: '#BDBDBD', // Disabled color
                          },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '13px',
                      },
                    }}
                    label="Exclude saved artists"
                  />
                </Grid2>
                <Grid2 size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={songSettings.exclude_saved_tracks}
                        checked={songSettings.exclude_saved_tracks}
                        size="small"
                        onChange={() => {
                          setSongSettings({
                            ...songSettings,
                            exclude_saved_tracks:
                              !songSettings.exclude_saved_tracks,
                          });
                        }}
                        sx={{
                          color: `${Colors.BLACK_SPOTIFY}`, // Default (unchecked) color
                          '&.Mui-checked': {
                            color: `${Colors.GREEN_SPOTIFY}`, // Checked color
                          },
                          '&.MuiCheckbox-indeterminate': {
                            color: `${Colors.BLACK_SPOTIFY}`, // Indeterminate color
                          },
                          '&:hover': {
                            backgroundColor: `rgba(30, 215, 96, 0.1)`, // Optional hover effect
                          },
                          '&.Mui-disabled': {
                            color: '#BDBDBD', // Disabled color
                          },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '13px',
                      },
                    }}
                    label="Exclude saved tracks"
                  />
                </Grid2>
              </Grid2>
            </AccordionDetails>
          </Accordion>
        </FormGroup>
      </Stack>*/}
      <Stack mx={2}>
        <Button
          variant="contained"
          size="medium"
          sx={{
            padding: 1,
            borderRadius: '10px',
            fontSize: '15px',
          }}
          onClick={findSong}
          fullWidth
        >
          Find
        </Button>
      </Stack>
    </Stack>
  );
};

export default RequestSongForm;
