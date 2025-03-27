import axios, { AxiosResponse } from 'axios';

interface Props {
  albumsIds: string;
}

export const checkSavedAlbum = async (props: Props) => {
  const { albumsIds } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<boolean[]> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/albums/contains?ids=${albumsIds}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching saved albums:',
        error.response ? error.response.data : error.message
      );
      return [] as boolean[];
    }
  }
  return [] as boolean[];
};
