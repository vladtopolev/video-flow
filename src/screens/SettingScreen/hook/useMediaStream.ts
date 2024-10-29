import { useCallback } from 'react';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import {
  SetAvailbaleDevicesFunctionType,
  useAvailableMediaDevices,
} from '../../../hooks/useAvailableMediaDevices';
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
      setSelectedAudioDevice,
      setSelectedVideoDevice,
    },
    mediaStream: { setStream },
  } = useVideoRecordFlowContext();

  // SET AVAILABLE DEVICES
  const setAvailableDevicesHandler: SetAvailbaleDevicesFunctionType =
    useCallback(
      (availableDevices) => {
        setAvailableDevices(availableDevices);
        if (availableDevices.videoDevices[0]) {
          setSelectedVideoDevice(availableDevices.videoDevices[0]);
        }
        if (availableDevices.audioDevices[0]) {
          setSelectedAudioDevice(availableDevices.audioDevices[0]);
        }
      },
      [setAvailableDevices, setSelectedVideoDevice, setSelectedAudioDevice],
    );

  useAvailableMediaDevices({ setAvailableDevices: setAvailableDevicesHandler });

  // PICK CAMERA STREAM BASED ON SELECTED DEVICES
  const setCapturedStream = useCallback<SetCapturedStreamFunctionType>(
    (stream) => {
      setStream(stream);
    },
    [setStream],
  );

  useGetMediaStream({
    constraints: DEFAULT_CONSTRAINTS,
    selectedVideoDevice,
    selectedAudioDevice,
    setCapturedStream,
  });
};

export default useMediaStream;
