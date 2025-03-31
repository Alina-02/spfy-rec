import React from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { SpotifyAlbum } from '../../constants/spotify';
import { Colors } from '../../constants/colors';

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
        height="85%"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack height="100%">
          {recommendation?.images?.length > 0 && (
            <Box
              minWidth="250px"
              maxWidth="550px"
              minHeight="250px"
              maxHeight="550px"
              sx={{
                position: 'relative',
                margin: 10,
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
              margin={10}
              minWidth="250px"
              width="450px"
              minHeight="250px"
              height="450px"
              borderRadius={'100%'}
            />
          )}
        </Stack>
        <Stack height="20%">
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
