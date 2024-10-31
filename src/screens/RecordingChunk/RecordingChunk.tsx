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
import useRecordingControl from './hooks/useRecordingControl';
import {
  useCurrentQuestionDuration,
  useVideoRecordFlowContext,
} from '../../context/VideoRecordFlow.context';
import { actions } from '../../state';

const RecordingChunk = () => {
  const {
    dispatch,
    telepromterSettings: { shouldBeScrolled },
  } = useVideoRecordFlowContext();
  const { maxDuration, minDuration } = useCurrentQuestionDuration();

  const { controlContainerWidth, setVideoContainerWidth } =
    useControlContainerWidth();
  const { spacing } = useTheme();
  const { videoContainerSx } = useStyles();

  const telepropterRef = useRef<TelepromterManagerProps>(null);
  const {
    startRecording,
    stopRecording,
    onRerecord,
    recordingState: { beforeRecordingCountdownRun, duration, isRecording },
  } = useRecordingControl({
    maxDuration,
    startRecordingAction: () => {
      telepropterRef.current?.stopScrolling();
      telepropterRef.current?.scrollTo(0);
      setTimeout(() => {
        if (shouldBeScrolled) {
          telepropterRef.current?.startScrolling();
        }
      }, 1000);
    },
    stopRecordingAction: () => {
      dispatch(actions.goNext());
    },
    reRecordAction: () => {
      telepropterRef.current?.stopScrolling();
      telepropterRef.current?.scrollTo(0);
    },
  });

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
              isRecording={isRecording}
              duration={duration}
              maxDuration={maxDuration}
              minDuration={minDuration}
              disabled={
                (isRecording && duration < minDuration) ||
                beforeRecordingCountdownRun
              }
              onStart={startRecording}
              onStop={stopRecording}
              onRerecord={onRerecord}
              onBack={() => {
                dispatch(actions.goPrev());
              }}
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
};

export default RecordingChunk;
