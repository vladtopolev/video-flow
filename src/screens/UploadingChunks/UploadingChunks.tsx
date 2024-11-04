import { useEffect, useState } from 'react';
import RecordingDialog from '../../components/RecordingDialog/RecordingDialog';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import useWarningCloseWindow from '../../hooks/useWarningCloseWindow';
import useTheme from '../../styles';
import ProgressView from './components/components/ProgressView';

type GenerationVideoState = {
  isLoading: boolean;
  isError: boolean;
  isDone: boolean;
  progress: number;
};

const UploadingChunks = () => {
  const {
    mediaStream: { stopStream },
  } = useVideoRecordFlowContext();

  const { spacing, palette } = useTheme();

  const [state, setState] = useState<GenerationVideoState>({
    isLoading: true,
    isDone: false,
    isError: false,
    progress: 0,
  });

  useWarningCloseWindow(!state.isDone);

  useEffect(() => {
    stopStream();
  }, [stopStream]);

  useEffect(() => {
    // TODO
    setState((prev) => prev);
  }, []);

  return (
    <RecordingDialog>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 600,
            backgroundColor: palette.common.white,
            padding: spacing(12),
          }}
        >
          <ProgressView progress={state.progress} />
        </div>
      </div>
    </RecordingDialog>
  );
};

export default UploadingChunks;
