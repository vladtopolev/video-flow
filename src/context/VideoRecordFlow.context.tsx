import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import useStream from './hooks/useMediaStream';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import useRecordVideoFlowUserChoise from '../state';
import type { UserChoise, UserChoiseAction } from '../state';
import useMediaDevices, {
  AvailableMediaDevices,
} from './hooks/useMediaDevices';

export type VideoRecordFlowContextType = {
  currentScreen: string;
  setCurrentScreen: Dispatch<SetStateAction<string>>;

  mediaStream: {
    stream: MediaStream | null;
    setStream: (stream: MediaStream) => void;
    stopStream: () => void;
    capturedStreamDimension: {
      width: number | null | undefined;
      height: number | null | undefined;
    };
    setCapturedStreamDimension: Dispatch<
      SetStateAction<{
        width: number | null | undefined;
        height: number | null | undefined;
      }>
    >;
  };

  mediaDevices: {
    availableDevices: AvailableMediaDevices;
    setAvailableDevices: (availbaleDevices: AvailableMediaDevices) => void;
    selectedVideoDevice: MediaDeviceInfo | null;
    setSelectedVideoDevice: (device: MediaDeviceInfo | null) => void;
    selectedAudioDevice: MediaDeviceInfo | null;
    setSelectedAudioDevice: (device: MediaDeviceInfo | null) => void;
  };
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & Required<VideoRecordFlowProps>;

const VideoRecordFlowContext = createContext<VideoRecordFlowContextType>(
  {} as VideoRecordFlowContextType,
);

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
  const mediaStream = useStream();
  const mediaDevices = useMediaDevices();
  const { userChoise, dispatch } = useRecordVideoFlowUserChoise();

  return (
    <VideoRecordFlowContext.Provider
      value={{
        currentScreen,
        mediaStream,
        mediaDevices,
        userChoise,
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
