import axios, { AxiosResponse } from 'axios';
import {
  GetSongSettings,
  SpotifyGenre,
  SpotifyTrack,
} from '../constants/spotify';
import { getNewReleases } from './getNewReleases';
import { formatStringId } from '../utils/formatStringIds';
import { checkFollowedArtist } from './checkFollowedArtist';
import { searchSpotify } from './searchForItem';
import { checkSavedAlbum } from './checkSavedAlbum';
import { checkSavedTrack } from './checkSavedTrack';

// Function to get playlists by genre

async function getPlaylistsByGenres(genre: SpotifyGenre): Promise<any[]> {
  const token = localStorage.getItem('spotify_access_token');

  try {
    // Join genres with space or 'OR' to match any genre
    const genreQuery = `q=genre:${genre}`;
    const url = `https://api.spotify.com/v1/search?type=playlist&${genreQuery}`;

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
  genre: SpotifyGenre
) => {
  const token = localStorage.getItem('spotify_access_token');
  const url = `https://api.spotify.com/v1/artists/${randomTrack.track.artists[0].id}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const songGenres: string[] = response.data.genres;
  return songGenres.length === 0
    ? songGenres.some((g) => g === genre.name)
    : true;
};

/*const getGenreNewRelease = async (genre: SpotifyGenre) => {
  const newReleases = await getNewReleases({ limit: 50 });
  const token = localStorage.getItem('spotify_access_token');
  console.log(newReleases);
  var genreReleases: any[] = [];
  newReleases?.albums?.items?.map(async (album) => {
    console.log(album);
    const response = await axios.get(album?.artists[0]?.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const artistGenres: string[] = response.data.genres;
    console.log(artistGenres, genre.name.toLowerCase());
    console.log(artistGenres.some((g) => g === genre.name.toLowerCase()));
    if (artistGenres.some((g) => g === genre.name.toLowerCase())) {
      genreReleases = [...genreReleases, response.data];
      console.log(genreReleases);
      if (genreReleases.length >= 10) {
        return genreReleases;
      }
    }
  });
};*/

const getGenreNewRelease = async (genre: SpotifyGenre) => {
  let genreReleases: any[] = [];
  let nextUrl: string | null =
    'https://api.spotify.com/v1/browse/new-releases?limit=50';
  const token = localStorage.getItem('spotify_access_token');
  const startTime = Date.now();
  const maxDuration = 30 * 1000; // 30 segundos

  while (
    nextUrl &&
    genreReleases.length < 10 &&
    Date.now() - startTime < maxDuration
  ) {
    try {
      // Obtener nuevas novedades desde la URL actual
      const { data: newReleases } = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Actualizar la URL de la siguiente página de resultados
      nextUrl = newReleases.albums.next;

      // Procesar cada álbum de la página actual
      for (const album of newReleases.albums.items) {
        if (genreReleases.length >= 10) break;

        try {
          const response = await axios.get(album.artists[0].href, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const artist = response.data;
          const artistGenres: string[] = artist.genres;
          if (artistGenres.some((g) => g === genre.name.toLowerCase())) {
            genreReleases.push(artist); // Guardamos el álbum en lugar del artista
          }
        } catch (error) {
          console.error(
            `Error obteniendo artista: ${album.artists[0].name}`,
            error
          );
        }
      }
    } catch (error) {
      console.error('Error obteniendo novedades:', error);
      break; // Si hay un error, detenemos la ejecución
    }
  }

  return genreReleases;
};

const getRandomSongByGenre = async (
  genre: SpotifyGenre,
  songSetting: GetSongSettings
) => {
  try {
    let validTrackFound = false;
    //const playlists = await getPlaylistsByGenres(genre);
    //console.log(playlists);

    const genreNewReleasesArtists = await getGenreNewRelease(genre);
    console.log(genreNewReleasesArtists);

    const formatedIds: string = formatStringId(genreNewReleasesArtists);
    const areSavedArtist: boolean[] = await checkFollowedArtist({
      artistIds: formatedIds,
    });
    console.log(areSavedArtist, 'saved');

    while (!validTrackFound) {
      // get random playlist
      const randomPlaylist =
        genreNewReleasesArtists[
          Math.floor(Math.random() * genreNewReleasesArtists.length)
        ];
      const playlistId = randomPlaylist.id;

      // check if the playlist is saved
      //const playlistSaved = await isPlaylistSaved(playlistId);

      //check if the release artist is followed

      if (
        //(!playlistSaved &&
        //songSetting.exclude_saved_playlist ||
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
          const sameGenre = await isSameGenre(randomTrack, genre);

          if (
            (sameGenre && songSetting.restrict_genre) ||
            !songSetting.restrict_genre
          ) {
            trackData = {
              name: randomTrack.track.name,
              artists: randomTrack.track.artists,
              album: {
                name: randomTrack.track.album.name,
                images: randomTrack.track.album.images,
              },
              release_date: randomTrack.track.album.release_date,
              url: randomTrack.track.external_urls.spotify,
              popularity: randomTrack.track.popularity,
            } as unknown as SpotifyTrack;
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

export const obtainANewSpotifyTrackRecomendation = async (genre: string) => {
  const genreResponse = await searchSpotify(`genre:${genre} `, 'track', 50, 0);
  const genreResponseTracks = genreResponse.tracks;
  const actualGenreTracks = genreResponseTracks?.items.length ?? 0;
  console.log(actualGenreTracks, 'número');
  console.log(genreResponseTracks?.total, 'limite');
  var cont = 0;

  while (genreResponseTracks && cont < actualGenreTracks) {
    const randomTrack = Math.floor(Math.random() * actualGenreTracks);
    const track = genreResponseTracks.items[randomTrack];

    const artisId = track.artists[0].id;
    const isFollowedArtist = await checkFollowedArtist({ artistIds: artisId });
    const albumId = track.album.id;
    const isSavedAlbum = await checkSavedAlbum({ albumsIds: albumId });
    const trackId = track?.id;
    const isSavedTrack = await checkSavedTrack({ tracksIds: trackId });

    if (!isFollowedArtist[0] && !isSavedAlbum[0] && !isSavedTrack[0])
      return genreResponseTracks.items[randomTrack];

    cont++;
  }

  return genreResponseTracks?.items[0];
};

export default getRandomSongByGenre;
