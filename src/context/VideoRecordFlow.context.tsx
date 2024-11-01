import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import type { UserChoise, UserChoiseAction } from '../state';
import useMediaDevices from './hooks/useMediaDevices';
import useStream from './hooks/useMediaStream';
import useTelepromterSettings from './hooks/useTelepromterSettings';

export type VideoRecordFlowContextType = {
  mediaStream: ReturnType<typeof useStream>;
  mediaDevices: ReturnType<typeof useMediaDevices>;
  telepromterSettings: ReturnType<typeof useTelepromterSettings>;
  chunks: Blob[];
  setChunk: (index: number, chunk: Blob) => void;
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & Required<VideoRecordFlowProps>;

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
} & Required<VideoRecordFlowProps>) => {
  const [chunks, setChunks] = useState<Blob[]>([]);
  const setChunk = (index: number, chunk: Blob) =>
    setChunks((prev) => {
      prev[index] = chunk;
      return prev;
    });

  const mediaStream = useStream();
  const mediaDevices = useMediaDevices();
  const telepromterSettings = useTelepromterSettings();

  return (
    <VideoRecordFlowContext.Provider
      value={{
        mediaStream,
        mediaDevices,
        telepromterSettings,
        chunks,
        setChunk,
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
