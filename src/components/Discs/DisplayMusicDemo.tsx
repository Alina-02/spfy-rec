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
        height="85%"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack height="100%">
          {recommendation?.album?.images?.length > 0 && (
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
                sx={{
                  animation: `${spin} 10s linear infinite`,
                  animationPlayState: !isPlaying ? 'paused' : 'running', // Control animation state
                }}
                src={recommendation?.album.images[0]?.url}
                borderRadius={'100%'}
              />
              <Box
                borderRadius="50%"
                width="140px"
                height="140px"
                sx={{
                  position: 'absolute', // Position icon over the image
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)', // Center the icon
                  fontSize: '100px', // Adjust size as needed
                  backgroundColor: `${Colors.BLACK_SPOTIFY}`,
                }}
              >
                <IconButton
                  onClick={togglePlay}
                  component={PlayCircleIcon}
                  sx={{
                    position: 'absolute', // Position icon over the image
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // Center the icon
                    fontSize: '80px', // Adjust size as needed
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
              margin={10}
              minWidth="250px"
              width="450px"
              minHeight="250px"
              height="450px"
              sx={{
                backgroundColor: 'white',
                animation: `${spin} 3s linear infinite`, // Apply the animation
              }}
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

export default DisplayMusicDemo;
