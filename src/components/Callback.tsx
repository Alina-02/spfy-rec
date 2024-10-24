// Callback.tsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CLIENT_ID, CLIENT_SECRET } from '../constants/spotify';


const REDIRECT_URI = 'http://localhost:5173/callback';

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
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('spotify_access_token', data.access_token);
        navigate('/main'); // Redirect to profile page after successful login
      } else {
        console.error('Failed to get access token', data);
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  return <div>Loading...</div>;
};

export default Callback;
