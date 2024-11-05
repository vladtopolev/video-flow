import { useRef, useState } from 'react';
import { BlobBackgroundUploader } from '../service/BlobBackgroundUploader';
import { BlobUploader } from '../../VideoRecordFlow.types';

const useChunks = ({ blobUploader }: { blobUploader: BlobUploader }) => {
  const blobBackgroundUploader = useRef(
    new BlobBackgroundUploader(blobUploader),
  );

  const [chunks, setChunks] = useState<Array<{ blob: Blob; duration: number }>>(
    [],
  );
  const setChunk = (index: number, blob: Blob, duration: number) => {
    blobBackgroundUploader.current.uploadBlob(blob, index, duration);
    setChunks((prev) => {
      const newChunks = [...prev];
      newChunks[index] = { blob, duration };
      return newChunks;
    });
  };

  return {
    chunks,
    setChunk,
    blobBackgroundUploader: blobBackgroundUploader.current,
  };
};

export default useChunks;
