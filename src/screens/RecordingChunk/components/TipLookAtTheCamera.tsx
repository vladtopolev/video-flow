import { Box, SxProps, Typography } from '@mui/material';
import useTheme from '../../../styles';
import { hex2rgba } from '../../../utils';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';

const TipLookAtTheCamera = ({ sx }: { sx?: SxProps }) => {
  const { corners, palette, typography, spacing } = useTheme();
  const { textDictionary } = useVideoRecordFlowContext();

  return (
    <Box
      className="look-at-the-camera"
      sx={{
        display: 'block',
        borderRadius: corners.md,
        px: spacing(3),
        py: spacing(3.5),
        position: 'relative',
        color: 'common.white',
        backgroundColor: hex2rgba(palette.background.dark_60, 0.6),
        textAlign: 'center',
        ...sx,
      }}
    >
      <Typography sx={typography.bodyL}>
        {textDictionary('RecordingChunkScreen.LookAtTheCamera')}
      </Typography>
    </Box>
  );
};

export default TipLookAtTheCamera;
