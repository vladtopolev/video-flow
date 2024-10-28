import { useEffect } from 'react';

export type SetAvailbaleDevicesFunctionType = (props: {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
}) => void;

export const useAvailableMediaDevices = ({
  setAvailableDevices,
}: {
  setAvailableDevices: SetAvailbaleDevicesFunctionType;
}) => {
  useEffect(() => {
    const getDevices = async () => {
      try {
        // Request permissions to access media devices
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // we request a stream just to get the permissions
        // to extract devices, here we should immedietly stop the stream
        // avoid any memory leaks
        stream.getTracks().forEach((track) => track.stop());

        // After permissions are granted, enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();

        const serializedDevice = devices.map((device) => device.toJSON());
        const videoDevices = serializedDevice.filter(
          (device) => device.kind === 'videoinput',
        );
        const audioDevices = serializedDevice.filter(
          (device) => device.kind === 'audioinput',
        );

        setAvailableDevices({ videoDevices, audioDevices });
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };
    getDevices();
  }, [setAvailableDevices]);
};
