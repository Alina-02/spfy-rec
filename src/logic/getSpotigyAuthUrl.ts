const REDIRECT_URI = 'http://localhost:5173/callback'; // Same as the one configured in Spotify Dashboard
const SCOPES = ['user-read-private', 'user-library-read']; // Add other scopes if needed

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;

// Generate Spotify Authorization URL
export function getSpotifyAuthUrl(): string {
  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    state: Math.random().toString(36).substring(2, 15), // Optional, adds security
  });

  return `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
}
