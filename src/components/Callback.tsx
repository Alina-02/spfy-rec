// Callback.tsx
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Colors } from '../constants/colors';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;

const url_protocol = window.location.protocol;
const base_url = window.location.hostname;
const port = window.location.port;

const REDIRECT_URI = `${url_protocol}//${base_url}/callback`;

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      exchangeCodeForToken(code);
    } else {
      console.error('Authorization code not found');
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    if (codeVerifier) {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
          }),
        });

        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);
          navigate('/main');
        } else {
          console.error('Failed to get access token', data);
        }
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      width={'100%'}
    >
      <CircularProgress size={60} sx={{ color: `${Colors.GREEN_SPOTIFY}` }} />
    </Box>
  );
};

export default Callback;
