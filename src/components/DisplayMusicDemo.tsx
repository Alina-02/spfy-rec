import React, { useRef, useState } from 'react';
import { TrackData } from '../constants/spotify';
import { Box, Button, Icon, IconButton, Stack } from '@mui/material';
import { Colors } from '../constants/colors';
import { css, keyframes } from '@emotion/react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

interface Props {
  songInfo: TrackData;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DisplayMusicDemo = ({ songInfo, audioRef }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const showPreview = () => {
    window.open(songInfo.url, '_blank');
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <Stack
      height="100%"
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ backgroundColor: `${Colors.BLACK_SPOTIFY}` }}
    >
      <Stack height="80%">
        {songInfo?.image && (
          <Box
            minWidth="250px"
            width="450px"
            minHeight="250px"
            height="450px"
            sx={{
              position: 'relative', // Make the wrapper relative to position the icon inside
              margin: 10,
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
              src={songInfo?.image.url}
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
              {songInfo?.preview !== undefined && (
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
              )}
            </Box>
            <audio
              ref={audioRef}
              src={songInfo?.preview}
              onEnded={() => setIsPlaying(false)}
            />
          </Box>
        )}
        {!songInfo?.image && (
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
          disabled={!songInfo}
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
  );
};

export default DisplayMusicDemo;
