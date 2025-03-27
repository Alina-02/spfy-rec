import axios, { AxiosResponse } from 'axios';

interface Props {
  type?: string;
  artistIds: string;
}

export const checkFollowedArtist = async (props: Props) => {
  const { type = 'artist', artistIds } = props;
  const token = localStorage.getItem('spotify_access_token');
  if (!!token) {
    try {
      const response: AxiosResponse<boolean[]> = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/following/contains?type=${type}&ids=${artistIds}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      // Handle error and print the message or response data
      console.error(
        'Error fetching followed artists:',
        error.response ? error.response.data : error.message
      );
      return [] as boolean[];
    }
  }
  return [] as boolean[];
};
