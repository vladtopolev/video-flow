import { useCallback, useState } from 'react';

const useMediaStream = () => {
  const [stream, _setStream] = useState<MediaStream | null>(null);

  const setStream = useCallback(async (cameraStream: MediaStream | null) => {
    _setStream((prevStream) => {
      if (prevStream) {
        prevStream.getTracks().forEach((track) => track.stop());
      }
      return cameraStream;
    });
  }, []);

  const stopStream = useCallback(() => {
    if (stream)
      stream.getTracks().forEach((track) => {
        track.stop();
      });
  }, [stream]);

  return { stream, setStream, stopStream };
};

export default useMediaStream;
