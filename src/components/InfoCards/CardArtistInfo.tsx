import {
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { SpotifyAlbum, SpotifyArtist } from '../../constants/spotify';
import { useEffect, useState } from 'react';
import { getArtist } from '../../logic/getArtist';

interface Props {
  recommendation: SpotifyAlbum;
}

const CardArtisInfo = (props: Props) => {
  const { recommendation } = props;
  console.log(recommendation);

  const [artistInfo, setArtistInfo] = useState<SpotifyArtist>();

  useEffect(() => {
    getArtist({ artistId: recommendation?.id }).then((artist) => {
      setArtistInfo(artist);
      console.log(artistInfo);
    });
  }, [recommendation]);

  const getFollowersPercentage = (followers: number) => {
    const percentage = (followers / 140000000) * 100;
    return percentage;
  };

  return (
    <Card
      sx={{
        marginY: 1,
        marginX: 2,
        maxWidth: '350px',
        height: '400px',
        borderRadius: '25px',
      }}
    >
      <CardContent sx={{ margin: 0, padding: 0 }}>
        <CardMedia
          component="img"
          height="150px"
          image={recommendation?.images[0]?.url}
        />
        <Stack m={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '12px', fontStyle: 'italic' }}
          >
            Artist
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '12px', fontWeight: 'bold' }}
          >
            {recommendation?.name}
          </Typography>
        </Stack>
        <Stack m={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '12px', fontStyle: 'italic' }}
            >
              Popularity
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '12px', fontStyle: 'italic' }}
            >
              {artistInfo?.popularity}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={artistInfo?.popularity}
            sx={{ height: 10, borderRadius: 10 }}
          />
        </Stack>
        <Stack m={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '12px', fontStyle: 'italic' }}
            >
              Followers
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '12px', fontStyle: 'italic' }}
            >
              {artistInfo?.followers?.total}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={
              artistInfo?.followers?.total
                ? getFollowersPercentage(artistInfo?.followers?.total)
                : 0
            }
            sx={{ height: 10, borderRadius: 10 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardArtisInfo;
