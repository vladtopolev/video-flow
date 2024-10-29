import { useEffect, useMemo } from 'react';

export type SetCapturedStreamFunctionType = (
  stream: MediaStream,
  settings?: { capturedWidth?: number; capturedHeight?: number },
) => void;

type UseGetMediaStreamProps = {
  constraints: MediaStreamConstraints;
  selectedVideoDevice?: MediaDeviceInfo | null;
  selectedAudioDevice?: MediaDeviceInfo | null;
  setCapturedStream?: SetCapturedStreamFunctionType;
};

const useGetMediaStream = ({
  constraints,
  selectedVideoDevice,
  selectedAudioDevice,
  setCapturedStream,
}: UseGetMediaStreamProps) => {
  const extendedConstraints = useMemo<MediaStreamConstraints>(
    () => ({
      ...(constraints.video
        ? {
            video: {
              ...(typeof constraints.video === 'boolean'
                ? {}
                : constraints.video),
              deviceId: { exact: selectedVideoDevice?.deviceId },
            },
          }
        : {}),
      ...(constraints.audio
        ? {
            audio: {
              ...(typeof constraints.audio === 'boolean'
                ? {}
                : constraints.audio),
              deviceId: { exact: selectedAudioDevice?.deviceId },
            },
          }
        : {}),
    }),
    [constraints, selectedVideoDevice, selectedAudioDevice],
  );

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(extendedConstraints).then((stream) => {
      const settings = stream.getVideoTracks()[0].getSettings();
      const capturedWidth = settings.width;
      const capturedHeight = settings.height;
      setCapturedStream?.(stream, { capturedHeight, capturedWidth });
    });
  }, [extendedConstraints, setCapturedStream]);
};

export default useGetMediaStream;
