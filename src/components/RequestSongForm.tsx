import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import getRandomSongByGenre from '../logic/getRandomSongByGenre';
import { SpotifyGenres, GetSongSettings } from '../constants/spotify';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Colors } from '../constants/colors';

interface Props {
  selectedGenre: SpotifyGenres[];
  setSongInfo: React.Dispatch<any>;
  genres: SpotifyGenres[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<SpotifyGenres[]>>;
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
        sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '35px' }}
      >
        randON
      </Typography>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        m={2}
        spacing={2}
      >
        {/*<TextField
          select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre([e.target.value as SpotifyGenres]);
          }}
          fullWidth
          size="small"
          slots={{
            input: (props) => (
              <OutlinedInput
                {...props}
                sx={{
                  borderRadius: '25px', // Custom border-radius for the select input
                }}
              />
            ),
          }}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  sx: {
                    '&::-webkit-scrollbar': {
                      display: 'none', // Hide scrollbar for Webkit browsers
                    },
                    borderRadius: '25px', // Custom border-radius for the dropdown menu
                  },
                },
              },
            },
          }}
          sx={{
            color: `${Colors.BLACK_SPOTIFY}`,
            borderColor: `${Colors.BLACK_SPOTIFY}`,
            '& .MuiFilledInput-root': {
              borderRadius: '25px', // Custom border-radius for filled variant
            },
          }}
        >
          {genres?.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>*/}

        <Autocomplete
          options={genres}
          value={selectedGenre[0]}
          onChange={(_event, newValue) => {
            setSelectedGenre([newValue as SpotifyGenres]);
          }}
          fullWidth
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={{
                color: `${Colors.BLACK_SPOTIFY}`,
                borderColor: `${Colors.BLACK_SPOTIFY}`,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px', // Custom border-radius for the input field
                },
              }}
              slots={{
                input: (props) => (
                  <OutlinedInput
                    {...props}
                    sx={{
                      borderRadius: '25px', // Custom border-radius for the select input
                    }}
                  />
                ),
              }}
            />
          )}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{
            padding: 1,
            width: '120px',
            height: '40px',
            borderRadius: '25px',
            color: `${Colors.BLACK_SPOTIFY}`,
            borderColor: `${Colors.BLACK_SPOTIFY}`,
          }}
          onClick={setRandomGenre}
        >
          Random
        </Button>
      </Stack>
      <Stack>
        <FormGroup>
          <Grid2 size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value={songSettings.restrict_genre}
                  checked={songSettings.restrict_genre}
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
                    mb: 1,
                  }}
                  onChange={() => {
                    setSongSettings({
                      ...songSettings,
                      restrict_genre: !songSettings.restrict_genre,
                    });
                  }}
                  size="small"
                />
              }
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '13px',
                  mb: 1,
                },
              }}
              label="Force the same genre (not similar :D)"
            />
          </Grid2>
          <Accordion
            sx={{
              width: '100%',
              borderRadius: '25px', // Border-radius for closed state
              '&:last-of-type': {
                borderBottomLeftRadius: '25px', // Override default MUI styles
                borderBottomRightRadius: '25px',
              },
              '&.Mui-expanded': {
                borderRadius: '25px', // Border-radius when expanded
                '&:last-of-type': {
                  borderBottomLeftRadius: '25px', // Ensure it applies when expanded
                  borderBottomRightRadius: '25px',
                },
              },
              '&::before': {
                backgroundColor: `rgba(30, 215, 96, 0)`,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                height: '30px',
              }}
            >
              <Typography sx={{ fontSize: '15px' }}>More Settings</Typography>
            </AccordionSummary>
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
      </Stack>
      <Stack mx={2}>
        <Button
          variant="contained"
          size="small"
          sx={{
            padding: 1,
            height: '40px',
            borderRadius: '25px',
            backgroundColor: `${Colors.BLACK_SPOTIFY}`,
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
