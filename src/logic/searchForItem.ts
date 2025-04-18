import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
} from '../constants/spotify';

export interface SearchResponse {
  tracks?: {
    total: number;
    items: SpotifyTrack[];
  };
  albums?: {
    total: number;
    items: SpotifyAlbum[];
  };
  artists?: {
    total: number;
    items: SpotifyArtist[];
  };
  playlists?: {
    items: any[];
  };
}

export async function searchSpotify(
  query: string,
  type: string,
  limit?: number,
  offset?: number,
  url?: string
): Promise<SearchResponse> {
  const token = localStorage.getItem('spotify_access_token');

  const apiUrl = url ? url : 'https://api.spotify.com/v1/search';
  const params = new URLSearchParams({
    q: query,
    type: type,
  });

  const response = await fetch(
    `${apiUrl}?${params.toString()}&limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data: SearchResponse = await response.json();
  return data;
}
