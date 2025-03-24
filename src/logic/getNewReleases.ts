import axios, { AxiosResponse } from 'axios';
import { SpotifyAlbum } from '../constants/spotify';

interface Props {
  limit: number;
  offset: number;
}

export const getNewReleases = async (props: Props) => {
  const { limit = 40, offset = 0 } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<SpotifyAlbum[]> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`,
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
      return [] as SpotifyAlbum[];
    }
  }
  return [] as SpotifyAlbum[];
};
