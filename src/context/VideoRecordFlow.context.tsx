import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import type { UserChoise, UserChoiseAction } from '../state';
import useMediaDevices, {
  AvailableMediaDevices,
} from './hooks/useMediaDevices';
import useStream from './hooks/useMediaStream';

export type VideoRecordFlowContextType = {
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

  ...videoRecordFlowProps
}: {
  children: ReactNode;
  userChoise: UserChoise;
  dispatch: Dispatch<UserChoiseAction>;
} & Required<VideoRecordFlowProps>) => {
  const mediaStream = useStream();
  const mediaDevices = useMediaDevices();

  return (
    <VideoRecordFlowContext.Provider
      value={{
        mediaStream,
        mediaDevices,
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
