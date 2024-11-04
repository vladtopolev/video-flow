import { Box, LinearProgress, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';
import TipContainer from '../../../../components/TipContainer/TipContainer';

const ProgressView = ({ progress }: { progress: number }) => {
  const { textDictionary } = useVideoRecordFlowContext();
  const { spacing, typography, palette } = useTheme();
  return (
    <Box>
      <Typography
        sx={{ color: palette.primary.dark, ...typography.titleS }}
        component="div"
      >
        {textDictionary('UploadingChunkScreen.Progress.SubTitle')}
      </Typography>
      <Typography
        component="h1"
        sx={{ mt: spacing(6), mb: spacing(10), ...typography.titleL }}
      >
        {textDictionary('UploadingChunkScreen.Progress.Title')}
      </Typography>
      <LinearProgress
        value={progress}
        variant="determinate"
        sx={{
          height: 8,
          borderRadius: 1,
        }}
      />
      <Typography sx={{ mt: spacing(4), ...typography.bodyL }} component="div">
        {textDictionary('UploadingChunkScreen.Progress.ProgressText', {
          progress: Math.ceil(progress),
        })}
      </Typography>

      <TipContainer
        tipText={textDictionary('UploadingChunkScreen.Progress.Tip')}
        style={{ marginTop: spacing(10) }}
      />
    </Box>
  );
};

export default ProgressView;
