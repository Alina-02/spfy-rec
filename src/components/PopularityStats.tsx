import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useGetTracksPopularity } from '../hooks/useGetTracksPopularity';
import { useGetArtistsPopularity } from '../hooks/useGetArtistsPopularity';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{ position: 'relative', display: 'inline-flex' }}
      width="60px"
      height="60px"
    >
      <CircularProgress variant="determinate" size={60} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
const PopularityStats = () => {
  const tracksPopularity = useGetTracksPopularity();
  const artistsPopularity = useGetArtistsPopularity();
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CircularProgressWithLabel value={tracksPopularity} />
        <Typography variant="subtitle1">
          Of your top songs are mainstream.
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CircularProgressWithLabel value={artistsPopularity} />
        <Typography variant="subtitle1">
          Of your top artists are mainstream.
        </Typography>
      </Stack>
      <Box
        width="100%"
        display="flex"
        justifyContent={'center'}
        paddingY={'15px'}
        textAlign={'center'}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Expand your music pool
        </Typography>
      </Box>
    </Stack>
  );
};

export default PopularityStats;
