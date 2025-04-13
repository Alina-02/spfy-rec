const url_protocol = window.location.protocol;
const base_url = window.location.hostname;
//const port = window.location.port;

const REDIRECT_URI = `${url_protocol}//${base_url}/callback`;

export const SCOPES = [
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-follow-read',
];
const authUrl = new URL('https://accounts.spotify.com/authorize');
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;

const generateRandomString = (length: number) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

function sha256(plain: string): Promise<ArrayBuffer> {
  // Returns a Promise that resolves to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input: any) => {
  // Convert the ArrayBuffer to a base64url-encoded string
  const uint8Array = new Uint8Array(input);
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Generate Spotify Authorization URL
export const getSpotifyAuthUrl = async () => {
  const codeVerifier = await generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = await base64encode(hashed);

  window.localStorage.setItem('code_verifier', codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};
