import { useState } from 'react';

export type AvailableMediaDevices = {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
};

const useMediaDevices = () => {
  const [availableDevices, setAvailableDevices] =
    useState<AvailableMediaDevices>({ videoDevices: [], audioDevices: [] });

  const [selectedVideoDevice, setSelectedVideoDevice] =
    useState<MediaDeviceInfo | null>(null);

  const [selectedAudioDevice, setSelectedAudioDevice] =
    useState<MediaDeviceInfo | null>(null);

  return {
    availableDevices,
    setAvailableDevices,
    selectedVideoDevice,
    setSelectedVideoDevice,
    selectedAudioDevice,
    setSelectedAudioDevice,
  };
};

export default useMediaDevices;
