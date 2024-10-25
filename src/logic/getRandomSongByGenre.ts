import axios, { AxiosResponse } from 'axios';
import {
  GetSongSettings,
  SpotifyGenres,
  TrackData,
} from '../constants/spotify';

// Function to get playlists by genre

async function getPlaylistsByGenres(genres: SpotifyGenres[]): Promise<any[]> {
  const token = localStorage.getItem('spotify_access_token');

  try {
    // Join genres with space or 'OR' to match any genre
    const genreQuery = genres.map((g) => `q=genre:${g}`).join('&');
    const url = `https://api.spotify.com/v1/search?type=playlist&${genreQuery}`;
    console.log(url);
    const response: AxiosResponse = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.playlists.items; // Return playlists
  } catch (error) {
    console.error('Playlist by genre error:', error);
    return [];
  }
}

// Function to check if the user has saved the playlist
async function isPlaylistSaved(playlistId: string) {
  const token = localStorage.getItem('spotify_access_token');

  const userInfo = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(userInfo.data);
  try {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userInfo.data.display_name}`;
    const response: AxiosResponse<boolean[]> = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('response2', response.data[0]);
    return response.data[0]; // Returns true if saved
  } catch (error) {
    console.log('playlist saved error');
  }
}

// Function to get a random track from the playlist
async function getRandomTrackFromPlaylist(playlistId: string): Promise<any> {
  const token = localStorage.getItem('spotify_access_token');
  try {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const response: AxiosResponse = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const tracks = response.data.items;
    return tracks[Math.floor(Math.random() * tracks.length)]; // Get random track
  } catch (error) {
    console.log('Random track from playlist error');
  }
}

// Function to check if the user has saved the track and its album
async function isTrackAndAlbumSaved(
  trackId: string,
  albumId: string
): Promise<{ trackSaved: boolean; albumSaved: boolean }> {
  const trackUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`;
  const albumUrl = `https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`;
  const token = localStorage.getItem('spotify_access_token');
  const [trackResponse, albumResponse] = await Promise.all([
    axios.get(trackUrl, { headers: { Authorization: `Bearer ${token}` } }),
    axios.get(albumUrl, { headers: { Authorization: `Bearer ${token}` } }),
  ]);

  return {
    trackSaved: trackResponse.data[0],
    albumSaved: albumResponse.data[0],
  };
}

const isSameGenre = async (
  randomTrack: { track: { artists: { id: any }[] } },
  genres: SpotifyGenres[]
) => {
  const token = localStorage.getItem('spotify_access_token');
  const url = `https://api.spotify.com/v1/artists/${randomTrack.track.artists[0].id}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const songGenres: string[] = response.data.genres;
  console.log(songGenres);
  return songGenres.length === 0
    ? genres.some((genre: string) => songGenres?.includes(genre))
    : true;
};

const getRandomSongByGenre = async (
  genres: SpotifyGenres[],
  songSetting: GetSongSettings
) => {
  try {
    let validTrackFound = false;
    const playlists = await getPlaylistsByGenres(genres);
    while (!validTrackFound) {
      // get random playlist
      const randomPlaylist =
        playlists[Math.floor(Math.random() * playlists.length)];
      const playlistId = randomPlaylist.id;

      // check if the playlist is saved
      const playlistSaved = await isPlaylistSaved(playlistId);

      if (
        (!playlistSaved && songSetting.exclude_saved_playlist) ||
        !songSetting.exclude_saved_playlist
      ) {
        let trackData: any = null;

        // Retry mechanism to find a valid track
        const randomTrack = await getRandomTrackFromPlaylist(playlistId);
        const trackId = randomTrack.track.id;
        const albumId = randomTrack.track.album.id;

        const { trackSaved, albumSaved } = await isTrackAndAlbumSaved(
          trackId,
          albumId
        );
        if (
          (!trackSaved &&
            songSetting.exclude_saved_tracks &&
            !albumSaved &&
            songSetting.exclude_saved_albums) ||
          (!songSetting.exclude_saved_tracks &&
            !songSetting.exclude_saved_albums)
        ) {
          const sameGenre = await isSameGenre(randomTrack, genres);

          if (
            (sameGenre && songSetting.restrict_genre) ||
            !songSetting.restrict_genre
          ) {
            trackData = {
              track: randomTrack.track.name,
              artist: randomTrack.track.artists[0].name,
              album: randomTrack.track.album.name,
              release_date: randomTrack.track.album.release_date,
              url: randomTrack.track.external_urls.spotify,
              image: randomTrack.track.album.images[0],
              popularity: randomTrack.track.popularity,
              preview: randomTrack.track.preview_url,
              trackSaved,
              albumSaved,
            } as TrackData;
            validTrackFound = true; // Mark as found
          }
        }

        return trackData;
      }
    }
  } catch (error) {
    console.error('Error fetching playlist data:', error);
  }
};

export default getRandomSongByGenre;
