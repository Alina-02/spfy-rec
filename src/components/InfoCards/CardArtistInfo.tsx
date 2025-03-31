import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { SpotifyAlbum } from '../../constants/spotify';

interface Props {
  recommendation: SpotifyAlbum;
}

const CardArtisInfo = (props: Props) => {
  const { recommendation } = props;
  console.log(recommendation);
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardArtisInfo;
