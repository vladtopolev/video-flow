import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import useStream from './hooks/useStream';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import useRecordVideoFlowUserChoise from '../state';
import type { UserChoise, UserChoiseAction } from '../state';

export type VideoRecordFlowContextType = {
  currentScreen: string;
  stream: MediaStream | null;
  setCurrentScreen: Dispatch<SetStateAction<string>>;
  setStream: (stream: MediaStream) => void;
  stopStream: () => void;
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & Required<VideoRecordFlowProps>;

const VideoRecordFlowContext = createContext<VideoRecordFlowContextType>({
  stream: null,
} as VideoRecordFlowContextType);

const VideoRecordFlowContextComponent = ({
  children,
  currentScreen,
  setCurrentScreen,
  ...videoRecordFlowProps
}: {
  children: ReactNode;
  currentScreen: string;
  setCurrentScreen: Dispatch<SetStateAction<string>>;
} & Required<VideoRecordFlowProps>) => {
  const { stream, setStream, stopStream } = useStream();
  const { userChoise, dispatch } = useRecordVideoFlowUserChoise();

  return (
    <VideoRecordFlowContext.Provider
      value={{
        stream,
        currentScreen,
        userChoise,
        setStream,
        stopStream,
        setCurrentScreen,
        dispatch,
        ...videoRecordFlowProps,
      }}
    >
      {children}
    </VideoRecordFlowContext.Provider>
  );
};

export const useVideoRecordFlowContext = () =>
  useContext(VideoRecordFlowContext);

export default VideoRecordFlowContextComponent;
