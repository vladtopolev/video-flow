import { Box } from '@mui/material';
import FitCenteredContentWithAspectRatio from '../../components/FitCenteredContentWithAspectRatio/FitCenteredContentWithAspectRatio';
import ReacordingDialog from '../../components/RecordingDialog/RecordingDialog';
import RecordingLayout from '../../components/RecordingLayout/RecordingLayout';
import useControlContainerWidth from '../RecordingChunk/hooks/useControlContainerWidth';
import useStyles from '../RecordingChunk/RecordingChunk.styles';
import Actions from './components/Actions';
import Player from './components/Player';

const RecordedChunkPreview = () => {
  const { controlContainerWidth, setVideoContainerWidth } =
    useControlContainerWidth();
  const { videoContainerSx } = useStyles();

  return (
    <ReacordingDialog>
      <RecordingLayout
        footer={
          <Box sx={{ width: controlContainerWidth }}>
            <Actions />
          </Box>
        }
      >
        <FitCenteredContentWithAspectRatio
          aspectRatio={600 / 900}
          onDimensionChange={(widthVideo) => setVideoContainerWidth(widthVideo)}
          sx={videoContainerSx}
        >
          <Player />
        </FitCenteredContentWithAspectRatio>
      </RecordingLayout>
    </ReacordingDialog>
  );
};

export default RecordedChunkPreview;
