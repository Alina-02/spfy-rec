import axios, { AxiosResponse } from 'axios';

interface Props {
  tracksIds: string;
}

export const checkSavedTrack = async (props: Props) => {
  const { tracksIds } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<boolean[]> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/tracks/contains?ids=${tracksIds}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching saved tracks:',
        error.response ? error.response.data : error.message
      );
      return [] as boolean[];
    }
  }
  return [] as boolean[];
};
