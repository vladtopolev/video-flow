import { Box } from '@mui/material';
import { useRef } from 'react';
import FitCenteredContentWithAspectRatio from '../../components/FitCenteredContentWithAspectRatio/FitCenteredContentWithAspectRatio';
import ReacordingDialog from '../../components/RecordingDialog/ReacordingDialog';
import RecordingLayout from '../../components/RecordingLayout/RecordingLayout';
import useTheme from '../../styles';
import { TelepromterManagerProps } from './components/Teleprompter/Teleprompter';
import useControlContainerWidth from './hooks/useControlContainerWidth';
import CameraStream from './sections/CameraStream';
import TelepromterOverlay from './sections/TelepromterOverlay';

const RecordingChunk = () => {
  const { controlContainerWidth, setVideoContainerWidth } =
    useControlContainerWidth();
  const { spacing, palette, corners } = useTheme();
  const telepropterRef = useRef<TelepromterManagerProps>(null);

  return (
    <ReacordingDialog>
      <RecordingLayout
        footer={
          <Box
            sx={{
              width: controlContainerWidth,
              mx: 'auto',
              marginTop: spacing(6),
            }}
          >
            <div style={{ height: 42, background: 'red' }} />
          </Box>
        }
      >
        <FitCenteredContentWithAspectRatio
          aspectRatio={600 / 900}
          onDimensionChange={(widthVideo) => setVideoContainerWidth(widthVideo)}
          sx={{
            position: 'relative',
            minHeight: 10,
            backgroundColor: palette.common.black,
            display: 'flex',
            alignItems: 'center',
            borderRadius: {
              xs: corners.md,
              md: corners.lg,
            },
            overflow: 'hidden',
          }}
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
