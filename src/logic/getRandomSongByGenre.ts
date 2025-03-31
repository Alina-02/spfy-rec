import { Settings } from '../constants/spotify';
import { checkFollowedArtist } from './checkFollowedArtist';
import { SearchResponse, searchSpotify } from './searchForItem';
import { checkSavedAlbum } from './checkSavedAlbum';
import { checkSavedTrack } from './checkSavedTrack';

const getRandomTrack = async (genreResponse: SearchResponse) => {
  const genreResponseTracks = genreResponse.tracks;
  const actualGenreTracks = genreResponseTracks?.items.length ?? 0;

  var cont = 0;

  while (genreResponseTracks && cont < actualGenreTracks) {
    const randomTrack = Math.floor(Math.random() * actualGenreTracks);
    const track = genreResponseTracks.items[randomTrack];

    const artisId = track.artists[0].id;
    const isFollowedArtist = await checkFollowedArtist({
      artistIds: artisId,
    });
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

const getRandomAlbum = async (genreResponse: SearchResponse) => {
  const genreResponseAlbums = genreResponse.albums;
  const actualGenreAlbums = genreResponseAlbums?.items.length ?? 0;

  var cont = 0;

  while (genreResponseAlbums && cont < actualGenreAlbums) {
    const randomAlbum = Math.floor(Math.random() * actualGenreAlbums);
    const album = genreResponseAlbums.items[randomAlbum];

    const artisId = album.artists[0].id;
    const isFollowedArtist = await checkFollowedArtist({
      artistIds: artisId,
    });
    const albumId = album.id;
    const isSavedAlbum = await checkSavedAlbum({ albumsIds: albumId });

    if (!isFollowedArtist[0] && !isSavedAlbum[0])
      return genreResponseAlbums.items[randomAlbum];

    cont++;
  }

  return genreResponseAlbums?.items[0];
};

const getRandomArtist = async (genreResponse: SearchResponse) => {
  const genreResponseArtists = genreResponse.albums;
  const actualGenreArtists = genreResponseArtists?.items.length ?? 0;

  var cont = 0;

  while (genreResponseArtists && cont < actualGenreArtists) {
    const randomArtist = Math.floor(Math.random() * actualGenreArtists);
    const artist = genreResponseArtists.items[randomArtist];

    const artisId = artist.id;
    const isFollowedArtist = await checkFollowedArtist({
      artistIds: artisId,
    });

    if (!isFollowedArtist[0]) return genreResponseArtists.items[randomArtist];

    cont++;
  }

  return genreResponseArtists?.items[0];
};

export const obtainANewSpotifyTrackRecomendation = async (
  genre: string,
  settings: Settings
) => {
  const genreResponse = await searchSpotify(`genre:${genre} `, settings, 50, 0);
  if (settings === Settings.TRACK) {
    return await getRandomTrack(genreResponse);
  } else if (settings === Settings.ALBUM) {
    return await getRandomAlbum(genreResponse);
  } else {
    return await getRandomArtist(genreResponse);
  }
};
