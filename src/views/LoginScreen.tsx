// LoginButton.tsx
import React from 'react';
import { getSpotifyAuthUrl } from '../logic/getSpotigyAuthUrl';
import { Button, Icon, Slide, Stack } from '@mui/material';
import { Colors } from '../constants/colors';

const LoginScreen: React.FC = () => {
  return (
    <Stack
      height="100%"
      justifyContent={'center'}
      alignItems={'center'}
      direction="row"
    >
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
            sx={{ backgroundColor: `${Colors.GREEN_SPOTIFY}` }}
            justifyContent={'center'}
            alignItems={'center'}
            padding={2}
          >
            <Button
              onClick={getSpotifyAuthUrl}
              color="secondary"
              sx={{
                fontSize: '30px',
                width: '200px',
                height: '60px',
                borderRadius: '10px',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Login
            </Button>
          </Stack>
        </Slide>
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
        <img src="/spotify_logo/Primary_Logo_Green_CMYK.svg" />
      </Icon>
    </Stack>
  );
};

export default LoginScreen;
