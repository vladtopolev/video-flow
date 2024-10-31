import { Box } from '@mui/material';
import { useRef } from 'react';
import FitCenteredContentWithAspectRatio from '../../components/FitCenteredContentWithAspectRatio/FitCenteredContentWithAspectRatio';
import ReacordingDialog from '../../components/RecordingDialog/ReacordingDialog';
import RecordingLayout from '../../components/RecordingLayout/RecordingLayout';
import useTheme from '../../styles';
import { TelepromterManagerProps } from './components/Teleprompter/Teleprompter';
import useControlContainerWidth from './hooks/useControlContainerWidth';
import useStyles from './RecordingChunk.styles';
import CameraStream from './sections/CameraStream';
import TelepromterOverlay from './sections/TelepromterOverlay';
import RecordControls from './components/RecordControls';

const RecordingChunk = () => {
  const { controlContainerWidth, setVideoContainerWidth } =
    useControlContainerWidth();
  const { spacing } = useTheme();
  const telepropterRef = useRef<TelepromterManagerProps>(null);

  const { videoContainerSx } = useStyles();

  const isChunkRecording = false;
  const duration = 0;
  const maxDuration = 100;
  const minDuration = 0;
  const beforeRecordingCountdownRun = false;

  return (
    <ReacordingDialog>
      <RecordingLayout
        className="RecordingChunkScreen"
        footer={
          <Box
            sx={{
              width: controlContainerWidth,
              mx: 'auto',
              mt: spacing(6),
            }}
          >
            <RecordControls
              isRecording={isChunkRecording}
              duration={duration}
              maxDuration={maxDuration}
              minDuration={minDuration}
              disabled={
                (isChunkRecording && duration < minDuration) ||
                beforeRecordingCountdownRun
              }
              onStart={() => {}}
              onStop={() => {}}
              onBack={() => {}}
              onRerecord={() => {}}
            />
          </Box>
        }
      >
        <FitCenteredContentWithAspectRatio
          aspectRatio={600 / 900}
          onDimensionChange={(widthVideo) => setVideoContainerWidth(widthVideo)}
          sx={videoContainerSx}
        >
          <CameraStream />
          <TelepromterOverlay telepromterManagerRef={telepropterRef} />
        </FitCenteredContentWithAspectRatio>
      </RecordingLayout>
    </ReacordingDialog>
  );
  /*return (
    <>
      <div>Recording Chunl</div>
      <div>
        <button
          onClick={() => {
            dispatch(actions.goPrev());
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            dispatch(actions.goNext());
          }}
        >
          Next
        </button>
      </div>
    </>
  );*/
};

export default RecordingChunk;
