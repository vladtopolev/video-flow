import { useRef, useState } from 'react';
import {
  BlobBackgroundUploader,
  BlobUploader,
} from '../service/BlobBackgroundUploader';

const useChunks = ({ blobUploader }: { blobUploader: BlobUploader }) => {
  const blobBackgroundUploader = useRef(
    new BlobBackgroundUploader(blobUploader),
  );

  const [chunks, setChunks] = useState<Blob[]>([]);
  const setChunk = (index: number, chunk: Blob) => {
    blobBackgroundUploader.current.uploadBlob(chunk, index);
    setChunks((prev) => {
      const newChunks = [...prev];
      newChunks[index] = chunk;
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
