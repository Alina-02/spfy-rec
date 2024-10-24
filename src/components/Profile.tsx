// Profile.tsx
import React, { useEffect, useState } from 'react';

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  id: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<SpotifyUserProfile | null>(null);
  const accessToken = localStorage.getItem('spotify_access_token');

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      console.error('No access token found');
    }
  }, [accessToken]);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Welcome, {profile.display_name}</h1>
      <p>Email: {profile.email}</p>
      <p>Spotify ID: {profile.id}</p>
    </div>
  );
};

export default Profile;
