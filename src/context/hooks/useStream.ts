import { useCallback, useState } from 'react';

const useStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    if (stream)
      stream.getTracks().forEach((track) => {
        track.stop();
      });
  }, [stream]);

  return { stream, setStream, stopStream };
};

export default useStream;
