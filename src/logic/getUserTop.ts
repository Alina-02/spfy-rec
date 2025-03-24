import axios, { AxiosResponse } from 'axios';
import { SpotifyArtist, SpotifyTrack } from '../constants/spotify';

interface Props {
  type: TopType;
  time_range?: TimeRange;
  limit?: number; //between 1 and 50
  offset?: number;
}

export enum TopType {
  ARTIST = 'artists',
  TRACKS = 'tracks',
}

export enum TimeRange {
  LONG_TERM = 'long_term',
  MEDIUM_TERM = 'medium_term',
  SHORT_TERM = 'short_term',
}

export interface SpotifyUserTop {
  href: string;
  limit: number;
  next: string;
  offset: string;
  previous: string;
  total: number;
  items: SpotifyArtist[] | SpotifyTrack[];
}

export const getUserTop = async (props: Props) => {
  const {
    type,
    time_range = TimeRange.MEDIUM_TERM,
    limit = 40,
    offset = 0,
  } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<SpotifyUserTop> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the list of genres

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching user top songs:',
        error.response ? error.response.data : error.message
      );
      return null as unknown as SpotifyUserTop;
    }
  }
  return null as unknown as SpotifyUserTop;
};
