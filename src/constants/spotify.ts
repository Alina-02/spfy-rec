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

// Enum with Spotify genres based on available genre seeds
export enum SpotifyGenres {
  Acoustic = 'acoustic',
  Afrobeat = 'afrobeat',
  AltRock = 'alt-rock',
  Alternative = 'alternative',
  Ambient = 'ambient',
  Anime = 'anime',
  BlackMetal = 'black-metal',
  Bluegrass = 'bluegrass',
  Blues = 'blues',
  Bossanova = 'bossanova',
  Brazilian = 'brazilian',
  Breakbeat = 'breakbeat',
  British = 'british',
  Cantopop = 'cantopop',
  ChicagoHouse = 'chicago-house',
  Children = 'children',
  Chill = 'chill',
  Classical = 'classical',
  Club = 'club',
  Comedy = 'comedy',
  Country = 'country',
  Dance = 'dance',
  Dancehall = 'dancehall',
  DeathMetal = 'death-metal',
  DeepHouse = 'deep-house',
  DetroitTechno = 'detroit-techno',
  Disco = 'disco',
  Disney = 'disney',
  DrumAndBass = 'drum-and-bass',
  Dub = 'dub',
  Dubstep = 'dubstep',
  Edm = 'edm',
  Electro = 'electro',
  Electronic = 'electronic',
  Emo = 'emo',
  Folk = 'folk',
  Forro = 'forro',
  French = 'french',
  Funk = 'funk',
  Garage = 'garage',
  German = 'german',
  Gospel = 'gospel',
  Goth = 'goth',
  Grindcore = 'grindcore',
  Groove = 'groove',
  Grunge = 'grunge',
  Guitar = 'guitar',
  Happy = 'happy',
  Hardcore = 'hardcore',
  HardRock = 'hard-rock',
  HeavyMetal = 'heavy-metal',
  HipHop = 'hip-hop',
  Holidays = 'holidays',
  HonkyTonk = 'honky-tonk',
  House = 'house',
  Indie = 'indie',
  IndiePop = 'indie-pop',
  Industrial = 'industrial',
  Iranian = 'iranian',
  JDance = 'j-dance',
  JIdol = 'j-idol',
  JPop = 'j-pop',
  JRock = 'j-rock',
  Jazz = 'jazz',
  KPop = 'k-pop',
  Kids = 'kids',
  Latin = 'latin',
  Latino = 'latino',
  Mallet = 'mallet',
  Metal = 'metal',
  Metalcore = 'metalcore',
  MinimalTechno = 'minimal-techno',
  Movie = 'movie',
  Mpb = 'mpb',
  NewAge = 'new-age',
  NewRelease = 'new-release',
  Opera = 'opera',
  Pagan = 'pagan',
  Party = 'party',
  PhilippinesOpm = 'philippines-opm',
  Piano = 'piano',
  Pop = 'pop',
  PowerPop = 'power-pop',
  ProgressiveHouse = 'progressive-house',
  PsychRock = 'psych-rock',
  Punk = 'punk',
  PunkRock = 'punk-rock',
  RAndB = 'r-n-b',
  RainyDay = 'rainy-day',
  Reggae = 'reggae',
  Reggaeton = 'reggaeton',
  RoadTrip = 'road-trip',
  Rock = 'rock',
  RockNRoll = 'rock-n-roll',
  Rockabilly = 'rockabilly',
  Romance = 'romance',
  Sad = 'sad',
  Salsa = 'salsa',
  Samba = 'samba',
  Sertanejo = 'sertanejo',
  ShowTunes = 'show-tunes',
  SingerSongwriter = 'singer-songwriter',
  Ska = 'ska',
  Sleep = 'sleep',
  Songwriter = 'songwriter',
  Soul = 'soul',
  Soundtracks = 'soundtracks',
  Spanish = 'spanish',
  Study = 'study',
  Summer = 'summer',
  Swedish = 'swedish',
  SynthPop = 'synth-pop',
  Tango = 'tango',
  Techno = 'techno',
  Trance = 'trance',
  TripHop = 'trip-hop',
  Tropical = 'tropical',
  Turkish = 'turkish',
  WorkOut = 'work-out',
  WorldMusic = 'world-music',
}
