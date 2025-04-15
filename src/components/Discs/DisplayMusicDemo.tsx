import { useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Colors } from '../../constants/colors';
import { SpotifyTrack } from '../../constants/spotify';

interface Props {
  recommendation: SpotifyTrack;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DisplayMusicDemo = ({ recommendation }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const showPreview = () => {
    window.open(recommendation.external_urls.spotify, '_blank');
  };

  const togglePlay = () => {
    if (isPlaying) {
      //audioRef.current.pause();
    } else {
      //audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
          {recommendation?.album?.images?.length > 0 && (
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
                sx={{
                  animation: `${spin} 10s linear infinite`,
                  animationPlayState: !isPlaying ? 'paused' : 'running',
                }}
                src={recommendation?.album.images[0]?.url}
                borderRadius={'100%'}
              />
              <Box
                borderRadius="50%"
                width="140px"
                height="140px"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '100px',
                  backgroundColor: `${Colors.BLACK_SPOTIFY}`,
                }}
              >
                <IconButton
                  onClick={togglePlay}
                  component={PlayCircleIcon}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '80px',
                    color: 'white',
                  }}
                />
              </Box>

              <audio
                //src={songInfo?.preview}
                onEnded={() => setIsPlaying(false)}
              />
            </Box>
          )}
          {!recommendation?.album?.images && (
            <Box
              minWidth={{ xs: '75px', md: '250px' }}
              maxWidth={{ xs: '250px', md: '550px' }}
              minHeight={{ xs: '250px', md: '450px' }}
              margin={{ xs: 3, md: 10 }}
              sx={{
                backgroundColor: 'white',
                animation: `${spin} 3s linear infinite`,
              }}
              borderRadius={'100%'}
            />
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

export default DisplayMusicDemo;
