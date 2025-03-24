import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { SpotifyTrack } from '../constants/spotify';

interface Props {
  songInfo: SpotifyTrack;
}

const CardSongInfo = ({ songInfo }: Props) => {
  return (
    <Card
      sx={{
        marginY: 1,
        marginX: 2,
        maxWidth: '350px',
        height: '440px',
        borderRadius: '25px',
      }}
    >
      <CardContent sx={{ margin: 0, padding: 0 }}>
        <CardMedia
          component="img"
          height="150px"
          image={songInfo?.album.images[0]?.url}
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
            {songInfo?.artists[0]?.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontSize: '12px', fontStyle: 'italic' }}
          >
            Track title
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            {songInfo.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontSize: '12px', fontStyle: 'italic' }}
          >
            Album
          </Typography>
          <Typography variant="subtitle1">{songInfo.album.name}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardSongInfo;
