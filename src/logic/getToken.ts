import axios from 'axios';
import qs from 'qs';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_ID as string;

const getSpotifyToken = async (): Promise<string> => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  // Encode client ID and secret as Base64 for the Authorization header
  const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  // Set the data for the POST request
  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    // Make the POST request to the token endpoint
    const response = await axios.post(tokenUrl, data, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the access token
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
    return 'error';
  }
};

export default getSpotifyToken;
