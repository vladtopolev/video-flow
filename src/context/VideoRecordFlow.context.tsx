import { createContext, Dispatch, ReactNode, useContext } from 'react';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import type { UserChoise, UserChoiseAction } from '../state';
import useChunks from './hooks/useChunks';
import useMediaDevices from './hooks/useMediaDevices';
import useStream from './hooks/useMediaStream';
import useTelepromterSettings from './hooks/useTelepromterSettings';

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type VideoFlowProps = MakeOptional<
  Required<VideoRecordFlowProps>,
  'fileUploader'
>;
export type VideoRecordFlowContextType = {
  mediaStream: ReturnType<typeof useStream>;
  mediaDevices: ReturnType<typeof useMediaDevices>;
  telepromterSettings: ReturnType<typeof useTelepromterSettings>;
  chunksManagment: ReturnType<typeof useChunks>;
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & VideoFlowProps;

const VideoRecordFlowContext = createContext<VideoRecordFlowContextType>(
  {} as VideoRecordFlowContextType,
);

const VideoRecordFlowContextComponent = ({
  children,

  ...videoRecordFlowProps
}: {
  children: ReactNode;
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & VideoFlowProps) => {
  const mediaStream = useStream();
  const mediaDevices = useMediaDevices();
  const telepromterSettings = useTelepromterSettings();
  const chunksManagment = useChunks({
    blobUploader: videoRecordFlowProps.blobUploader,
  });

  return (
    <VideoRecordFlowContext.Provider
      value={{
        mediaStream,
        mediaDevices,
        telepromterSettings,
        chunksManagment,
        ...videoRecordFlowProps,
      }}
    >
      {children}
    </VideoRecordFlowContext.Provider>
  );
};

export const useVideoRecordFlowContext = () =>
  useContext(VideoRecordFlowContext);

export const useCurrentQuestionDuration = () => {
  const {
    minVideoDurationDefault,
    maxVideoDurationDefault,
    userChoise: { currentQuestionIndex, pickedQuestions },
  } = useVideoRecordFlowContext();

  const minDuration =
    pickedQuestions[currentQuestionIndex]?.duration?.min ||
    minVideoDurationDefault;
  const maxDuration =
    pickedQuestions[currentQuestionIndex]?.duration?.max ||
    maxVideoDurationDefault;

  return { maxDuration, minDuration };
};

export default VideoRecordFlowContextComponent;
