import axios, { AxiosResponse } from 'axios';  // Import Axios and its types
import { SpotifyGenres } from '../constants/spotify';
import getSpotifyToken from './getToken';

interface SpotifyGenreResponse {
    genres: SpotifyGenres[];
  }

const getGenres = async () => {
  const token = await getSpotifyToken()
    try {
        const response: AxiosResponse<SpotifyGenreResponse> = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        // Log the list of genres
        return(response.data.genres)
      } catch (error: any) {
        // Handle error and print the message or response data
        console.error('Error fetching genres:', error.response ? error.response.data : error.message);
        return null
      }
}

export default getGenres;