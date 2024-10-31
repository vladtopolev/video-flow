import { Box, Typography } from '@mui/material';
import utils from '../../../../utils';
import useTheme from '../../../../styles';

const VideoTimestamps = ({
  duration,
  maxDuration,
}: {
  duration: number;
  maxDuration: number;
}) => {
  const { typography, spacing, palette } = useTheme();
  return (
    <Box>
      <Typography
        sx={{
          ...typography.titleXS,
          fontWeight: 600,
          mr: spacing(1),
          color: 'white',
        }}
      >
        {utils.secsToTime(duration)}
      </Typography>
      <Typography
        sx={{
          ...typography.titleXS,
          fontWeight: 600,
          color: palette.text.secondary,
        }}
      >
        {utils.secsToTime(maxDuration)}
      </Typography>
    </Box>
  );
};

export default VideoTimestamps;
