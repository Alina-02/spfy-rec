// LoginButton.tsx
import React from 'react';
import { getSpotifyAuthUrl } from '../logic/getSpotigyAuthUrl';
import { Button, Slide, Stack } from '@mui/material';
import { Colors } from '../constants/colors';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    console.log('ddddf');
    const authUrl = getSpotifyAuthUrl();
    window.location.href = authUrl; // Redirect to Spotify's login page
  };

  return (
    <Stack height="100%" justifyContent={'center'} alignItems={'center'}>
      <Stack
        width="70%"
        height="100%"
        sx={{ backgroundColor: `${Colors.BLACK_SPOTIFY}` }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Slide direction="up" mountOnEnter in appear timeout={1000}>
          <Stack
            width="600px"
            height="600px"
            borderRadius={'100%'}
            sx={{ backgroundColor: 'white' }}
            justifyContent={'center'}
            alignItems={'center'}
            padding={2}
          >
            <Button
              onClick={handleLogin}
              variant="outlined"
              sx={{
                color: `${Colors.GREEN_SPOTIFY}`,
                borderColor: `${Colors.GREEN_SPOTIFY}`,
                backgroundColor: `rgba(30, 215, 96, 0.2)`,
                fontSize: '30px',
                width: '200px',
                borderRadius: '25px',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Login
            </Button>
          </Stack>
        </Slide>
      </Stack>
    </Stack>
  );
};

export default LoginButton;
