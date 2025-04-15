import { Box, Button, Stack, Typography } from '@mui/material';
import { SpotifyAlbum } from '../../constants/spotify';
import { Colors } from '../../constants/colors';
import { InfoOutlined } from '@mui/icons-material';

interface Props {
  recommendation: SpotifyAlbum;
}

const DisplayAlbumDisc = (props: Props) => {
  const { recommendation } = props;

  const showPreview = () => {
    window.open(recommendation.external_urls.spotify, '_blank');
  };

  return (
    <Stack height="100%" sx={{ backgroundColor: `${Colors.BLACK_SPOTIFY}` }}>
      <Stack
        height={{ xs: 'auto', md: '85%' }}
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={{ xs: 'column-reverse', md: 'column' }}
        marginTop={{ xs: 3, md: 0 }}
      >
        <Stack height="100%">
          {recommendation?.images?.length > 0 && (
            <Box
              minWidth={{ xs: '75px', md: '250px' }}
              maxWidth={{ xs: '250px', md: '550px' }}
              minHeight="250px"
              maxHeight="550px"
              margin={{ xs: 3, md: 10 }}
              sx={{
                position: 'relative',
                marginBottom: 5,
              }}
            >
              <Box
                width="100%"
                height="100%"
                component="img"
                src={recommendation?.images[0]?.url}
                borderRadius={'100%'}
              />
            </Box>
          )}
          {!recommendation?.images && (
            <Box
              minWidth={{ xs: '75px', md: '250px' }}
              width={{ xs: '250px', md: '450px' }}
              minHeight={{ xs: '250px', md: '450px' }}
              margin={{ xs: 3, md: 10 }}
              borderRadius="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              sx={{ backgroundColor: 'white' }}
            >
              {recommendation === undefined && (
                <Stack>
                  <Typography variant="subtitle1">
                    Try looking for something that someone other than you knows.
                  </Typography>
                  <Stack
                    direction="row"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}
                  >
                    <InfoOutlined sx={{ fontSize: 17 }} />
                    <Typography variant="caption" fontStyle="italic">
                      It's harder to find albums from specific genres, try to
                      generalize.
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </Box>
          )}
        </Stack>
        <Stack height={{ xs: 'auto', md: '20%' }}>
          <Button
            disabled={!recommendation}
            sx={{
              borderColor: `${Colors.GREEN_SPOTIFY}`,
              color: `${Colors.GREEN_SPOTIFY}`,
              backgroundColor: `rgba(30, 215, 96, 0.1)`,
              borderRadius: '25px',
            }}
            variant="outlined"
            onClick={showPreview}
          >
            Go to Spotify
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DisplayAlbumDisc;
