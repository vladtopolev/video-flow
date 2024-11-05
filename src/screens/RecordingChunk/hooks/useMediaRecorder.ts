import utils from '../../../utils';
import { useEffect, useRef } from 'react';
import { webmFixDuration } from 'webm-fix-duration';

export class MediaRecorderManager {
  private mediaRecorder: MediaRecorder;
  private duration = 0;
  private recordingStartedAt = 0;

  constructor(
    private stream: MediaStream,
    private onNewChunkAdded: (chunk: Blob, duration: number) => void,
  ) {
    this.mediaRecorder = this.createNewRecorder();
  }

  startRecord() {
    if (this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start();
    } else {
      this.mediaRecorder.resume();
    }
    this.recordingStartedAt = Date.now();
  }

  stopRecord() {
    this.duration = Date.now() - this.recordingStartedAt;
    this.mediaRecorder.stop();
  }

  createNewRecorder() {
    this.duration = 0;

    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: `${utils.supportedVideoMimeType()}`,
      bitsPerSecond: 2500000,
    });
    this.mediaRecorder.addEventListener('dataavailable', async (e) => {
      if (e.data.size > 0) {
        if (
          utils.supportedVideoMimeType() === utils.VIDEO_MIME_TYPES.videoWebm
        ) {
          const fixedBlob = await webmFixDuration(e.data, this.duration);
          this.onNewChunkAdded(fixedBlob, this.duration);
          return;
        }
        this.onNewChunkAdded(e.data, this.duration);
      }
    });
    return this.mediaRecorder;
  }
}

type UseMediaRecorderArgs = {
  stream: MediaStream | null;
  onNewChunkAdded: (blob: Blob, duration: number) => void;
};
const useMediaRecorder = ({
  stream,
  onNewChunkAdded,
}: UseMediaRecorderArgs) => {
  const mediaRecorderManageRef = useRef<MediaRecorderManager | null>(null);

  useEffect(() => {
    if (stream) {
      mediaRecorderManageRef.current = new MediaRecorderManager(
        stream,
        (blob, duration) => {
          onNewChunkAdded(blob, duration);
        },
      );
    }
    return () => {
      mediaRecorderManageRef.current = null;
    };
  }, [stream, onNewChunkAdded]);

  return { mediaRecorderManageRef };
};

export default useMediaRecorder;
