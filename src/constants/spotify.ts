export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifySimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: ExternalSpotifyUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: RestrictionOption;
  };
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
  is_local: string;
}

export interface SpotifyAlbum {
  album_type: AlbumType;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalSpotifyUrls;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: RestrictionOption;
  };
  type: string;
  uri: string;
  artists: SpotifySimplifiedArtist[];
}

export interface SpotifySimplifiedArtist {
  external_urls: ExternalSpotifyUrls[];
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalSpotifyUrls {
  spotify: string;
}

export interface SpotifyImageObject {
  url: string;
  height: number;
  width: number;
}

export enum AlbumType {
  ALBUM = 'album',
  SINGLE = 'single',
  COMPILATION = 'compilation',
}

export enum RestrictionOption {
  MARKET = 'market',
  PRODUCT = 'product',
  EXPLICIT = 'explicit',
}

export interface SpotifyArtist {
  external_urls?: ExternalSpotifyUrls[];
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  href?: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export enum Settings {
  TRACK = 'track',
  ALBUM = 'album',
  ARTIST = 'artist',
}

export interface SpotifyImage {
  width: string;
  url: string;
}

export interface SpotifyGenre {
  id: number;
  name: string;
}
