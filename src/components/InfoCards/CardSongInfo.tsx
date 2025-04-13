import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { SpotifyTrack } from '../../constants/spotify';

interface Props {
  recommendation: SpotifyTrack;
}

const CardSongInfo = (props: Props) => {
  const { recommendation } = props;

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
          sx={{ maxHeight: '150px' }}
          image={recommendation?.album.images[0]?.url}
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
            {recommendation?.artists[0]?.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontSize: '12px', fontStyle: 'italic' }}
          >
            Track title
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            {recommendation.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontSize: '12px', fontStyle: 'italic' }}
          >
            Album
          </Typography>
          <Typography variant="subtitle1">
            {recommendation.album.name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardSongInfo;
