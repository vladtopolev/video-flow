import { useEffect, useState } from 'react';
import RecordingDialog from '../../components/RecordingDialog/RecordingDialog';
import { useVideoRecordFlowContext } from '../../context/VideoRecordFlow.context';
import useWarningCloseWindow from '../../hooks/useWarningCloseWindow';
import useTheme from '../../styles';
import ProgressView from './components/ProgressView';
import { VideoRecordWayTypes } from '../../recordVideoWays';

type GenerationVideoState = {
  isLoading: boolean;
  isError: boolean;
  isDone: boolean;
  progress: number;
};

const UploadingChunks = () => {
  const {
    width,
    height,
    userChoise,
    mediaStream: { stopStream },
    chunksManagment: { blobBackgroundUploader },
    onFinished,
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
    const progressListener = (progress: number, isDone: boolean) => {
      setState((prevState) => ({
        ...prevState,
        progress,
        isDone,
      }));
    };

    blobBackgroundUploader.registerProgressListener(progressListener);

    return () => {
      blobBackgroundUploader.unRegisterProgressListener(progressListener);
    };
  }, [blobBackgroundUploader]);

  useEffect(() => {
    if (state.isDone) {
      const { pickedQuestions, music, recordVideoWay } = userChoise;
      onFinished({
        width,
        height,
        questions: pickedQuestions,
        chunks: blobBackgroundUploader.chunks,
        music,
        recordVideoWay: recordVideoWay as
          | VideoRecordWayTypes.FREELY
          | VideoRecordWayTypes.RANDOM_QUESTIONS,
      });
    }
  }, [
    state.isDone,
    userChoise,
    blobBackgroundUploader,
    onFinished,
    width,
    height,
  ]);

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
