import { useCallback } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import { useAvailableMediaDevices } from '../../../hooks/useAvailableMediaDevices';
import useGetMediaStream, {
  SetCapturedStreamFunctionType,
} from '../../../hooks/useGetMediaStream';

const DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
  audio: true,
  video: {
    frameRate: 30,
    width: { ideal: 1920 },
    advanced: [{ width: { ideal: 1920 }, frameRate: 30 }],
  },
};

const useMediaStream = () => {
  const {
    mediaDevices: {
      selectedVideoDevice,
      selectedAudioDevice,
      setAvailableDevices,
    },
    mediaStream: { setStream, setCapturedStreamDimension },
  } = useVideoRecordFlowContext();

  // SET AVAILABLE DEVICES
  useAvailableMediaDevices({ setAvailableDevices });

  // PICK CAMERA STREAM BASED ON SELECTED DEVICES
  const setCapturedStream = useCallback<SetCapturedStreamFunctionType>(
    (stream, settings) => {
      setStream(stream);
      setCapturedStreamDimension({
        width: settings?.capturedWidth,
        height: settings?.capturedHeight,
      });
    },
    [setStream, setCapturedStreamDimension],
  );

  useGetMediaStream({
    constraints: DEFAULT_CONSTRAINTS,
    selectedVideoDevice,
    selectedAudioDevice,
    setCapturedStream,
  });
};

export default useMediaStream;
