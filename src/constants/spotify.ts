export interface TrackData {
  track: string;
  artist: string;
  album: string;
  release_date: Date;
  url: string;
  image: SpotifyImage;
  popularity: number;
  preview: string;
  trackSaved: boolean;
  albumSaved: boolean;
}

export interface GetSongSettings {
  exclude_saved_albums: boolean;
  exclude_saved_playlist: boolean;
  exclude_saved_artist: boolean;
  exclude_saved_tracks: boolean;
  restrict_genre: boolean;
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
