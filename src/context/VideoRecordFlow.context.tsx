import { createContext, Dispatch, ReactNode, useContext } from 'react';
import { VideoRecordFlowProps } from '../VideoRecordFlow';
import type { UserChoise, UserChoiseAction } from '../state';
import useMediaDevices from './hooks/useMediaDevices';
import useStream from './hooks/useMediaStream';
import useTelepromterSettings from './hooks/useTelepromterSettings';

export type VideoRecordFlowContextType = {
  mediaStream: ReturnType<typeof useStream>;
  mediaDevices: ReturnType<typeof useMediaDevices>;
  telepromterSettings: ReturnType<typeof useTelepromterSettings>;
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
  const telepromterSettings = useTelepromterSettings();

  return (
    <VideoRecordFlowContext.Provider
      value={{
        mediaStream,
        mediaDevices,
        telepromterSettings,
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
