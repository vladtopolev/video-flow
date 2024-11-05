import { supportedVideoMimeType, VIDEO_MIME_TYPES } from '../../utils';
import { BlobUploader } from '../../VideoRecordFlow.types';

export class BlobBackgroundUploader {
  private blobUploader: BlobUploader;
  private blobs: Array<Blob | null> = [];
  private blobMeta: Array<
    | {
        progress: number;
        isUploaded: boolean;
        link: string | null;
        duration: number;
        abortController: AbortController | null;
        originalFormat: 'mp4' | 'webm';
      }
    | undefined
  > = [];

  get chunks() {
    return this.blobMeta.map((meta) => ({
      link: meta?.link || '',
      duration: meta?.duration || 0,
    }));
  }

  get progress() {
    // 0-100%
    const uploadingVideoProgress =
      this.blobMeta.reduce((memo, meta) => memo + (meta?.progress || 0), 0) /
      this.blobMeta.length;

    return uploadingVideoProgress;
  }

  get isDone() {
    const isVideoUploadingCompleted = this.blobMeta.every(
      (meta) => !!meta?.isUploaded,
    );

    return isVideoUploadingCompleted;
  }

  private progressListeners: Array<
    (progress: number, isDone: boolean) => void
  > = [];

  constructor(blobUploader: BlobUploader) {
    this.blobUploader = blobUploader;
  }

  registerProgressListener(
    listener: (progress: number, isDone: boolean) => void,
  ) {
    this.progressListeners = [...this.progressListeners, listener];
    listener(this.progress, this.isDone);
  }

  unRegisterProgressListener(
    listener: (progress: number, isDone: boolean) => void,
  ) {
    this.progressListeners = this.progressListeners.filter(
      (l) => l !== listener,
    );
  }

  notifyProgressListeners() {
    this.progressListeners.forEach((listener) =>
      listener(this.progress, this.isDone),
    );
  }

  async uploadBlob(blob: Blob, index: number, duration: number) {
    const originalFormat =
      supportedVideoMimeType() === VIDEO_MIME_TYPES.videoWebm ? 'webm' : 'mp4';
    // abort preveisly uploading file if it is uploading
    this.blobMeta[index]?.abortController?.abort();

    const abortController = new AbortController();
    this.blobs[index] = blob;
    this.blobMeta[index] = {
      progress: 0,
      isUploaded: false,
      link: null,
      duration,
      originalFormat,
      abortController,
    };

    const link = await this.blobUploader({
      blob,
      index,
      abortController,
      originalFormat,
      onProgress: (uploaded, total) => {
        this.blobMeta[index] = {
          ...this.blobMeta[index]!,
          progress: (uploaded * 100) / total,
          isUploaded: false,
        };
        this.notifyProgressListeners();
      },
    });

    this.blobMeta[index] = {
      progress: 100,
      isUploaded: true,
      link,
      duration,
      originalFormat,
      abortController: null,
    };
    this.blobs[index] = null;
    this.notifyProgressListeners();
  }
}
