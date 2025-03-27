import axios, { AxiosResponse } from 'axios';
import { SpotifyAlbum } from '../constants/spotify';

interface Props {
  limit?: number;
  offset?: number;
  url?: string;
}

export interface SpotifyNewReleases {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: string;
    previous: string;
    total: number;
    items: SpotifyAlbum[];
  };
}

export const getNewReleases = async (props: Props) => {
  const { limit = 40, offset = 0, url } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<SpotifyNewReleases> = await axios({
        method: 'get',
        url: url
          ? url
          : `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the list of genres

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching new album releases:',
        error.response ? error.response.data : error.message
      );
      return null as unknown as SpotifyNewReleases;
    }
  }
  return null as unknown as SpotifyNewReleases;
};
