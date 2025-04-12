import axios, { AxiosResponse } from 'axios';
import { SpotifyArtist } from '../constants/spotify';

interface Props {
  artistId: string;
}

export const getArtist = async (props: Props) => {
  const { artistId } = props;
  const token = localStorage.getItem('spotify_access_token');

  if (!!token) {
    try {
      const response: AxiosResponse<SpotifyArtist> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the list of genres

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching artist:',
        error.response ? error.response.data : error.message
      );
      return null as unknown as SpotifyArtist;
    }
  }
  return null as unknown as SpotifyArtist;
};
