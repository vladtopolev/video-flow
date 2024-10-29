import { useCallback, useState } from 'react';

export type AvailableMediaDevices = {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
};

const useMediaDevices = () => {
  const [mediaDevice, setMediaDevice] = useState<{
    availableDevices: AvailableMediaDevices;
    selectedVideoDevice: MediaDeviceInfo | null;
    selectedAudioDevice: MediaDeviceInfo | null;
  }>({
    availableDevices: { videoDevices: [], audioDevices: [] },
    selectedAudioDevice: null,
    selectedVideoDevice: null,
  });

  const setAvailableDevices = useCallback(
    (availableDevices: AvailableMediaDevices) =>
      setMediaDevice((prev) => {
        const selectedAudioDevice =
          availableDevices.audioDevices[0] || prev.selectedAudioDevice;
        const selectedVideoDevice =
          availableDevices.videoDevices[0] || prev.selectedVideoDevice;
        return {
          availableDevices,
          selectedAudioDevice,
          selectedVideoDevice,
        };
      }),
    [],
  );

  const setSelectedAudioDevice = useCallback(
    (device: MediaDeviceInfo | null) =>
      setMediaDevice((prev) => ({ ...prev, selectedAudioDevice: device })),
    [],
  );

  const setSelectedVideoDevice = useCallback(
    (device: MediaDeviceInfo | null) =>
      setMediaDevice((prev) => ({ ...prev, selectedVideoDevice: device })),
    [],
  );

  return {
    ...mediaDevice,
    setAvailableDevices,
    setSelectedAudioDevice,
    setSelectedVideoDevice,
  };
};

export default useMediaDevices;
