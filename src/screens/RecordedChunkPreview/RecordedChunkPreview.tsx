import { Box } from '@mui/material';
import ReacordingDialog from '../../components/RecordingDialog/RecordingDialog';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import useControlContainerWidth from '../RecordingChunk/hooks/useControlContainerWidth';
import FitCenteredContentWithAspectRatio from '../../components/FitCenteredContentWithAspectRatio/FitCenteredContentWithAspectRatio';
import RecordingLayout from '../../components/RecordingLayout/RecordingLayout';
import useStyles from '../RecordingChunk/RecordingChunk.styles';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const RecordedChunkPreview = () => {
  const {
    width,
    height,
    userChoise: { currentQuestionIndex },
    chunks,
  } = useVideoRecordFlowContext();
  const { controlContainerWidth, setVideoContainerWidth } =
    useControlContainerWidth();
  const { videoContainerSx } = useStyles();

  const recordedDuration = 100; // TODO: get from context
  const blob = chunks[currentQuestionIndex];
  return (
    <ReacordingDialog>
      <RecordingLayout
        footer={<Box sx={{ width: controlContainerWidth }}>Actions</Box>}
      >
        <FitCenteredContentWithAspectRatio
          aspectRatio={600 / 900}
          onDimensionChange={(widthVideo) => setVideoContainerWidth(widthVideo)}
          sx={videoContainerSx}
        >
          <VideoPlayer
            blob={blob}
            duration={recordedDuration}
            containerStyle={{
              aspectRatio: `${width}/${height}`,
              height: '100%',
              position: 'relative',
              margin: '0 auto',
              maxWidth: '100%',
              borderRadius: 0.5,
              overflow: 'hidden',
            }}
            size={'sm'}
            flipVideo
          />
        </FitCenteredContentWithAspectRatio>
      </RecordingLayout>
    </ReacordingDialog>
  );
  /*
  return (
    <>
      <div>Recording Chunk Preview</div>
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

export default RecordedChunkPreview;
