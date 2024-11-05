import { VideoRecordWayTypes } from './recordVideoWays';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type QuestionConfig = {
  id: string;
  webText: string; // <- question shown during recording
  videoText?: string; // <- question shown in generated video for question
  tipText?: string;
  promptTip?: string;

  response?: string; // <- idea and possible way people should ask a question

  mandatory?: boolean;
  duration?: {
    min?: number;
    max?: number;
  };
};

export type BackgroundMusicConfig = {
  name?: string;
  src: string;
  coverSrc?: string;
};

export enum DefaultScreenTypes {
  PICK_VIDEO_RECORD_WAY = 'PICK_VIDEO_RECORD_WAY',
  UPLOAD_VIDEO = 'UPLOAD_VIDEO',
  CHECK_CAMERA_STREAM = 'CHECK_CAMERA_STREAM',
  INITIAL_SETTINGS = 'INITIAL_SETTINGS',
  BEFORE_RECORDING = 'BEFORE_RECORDING',
  RECORDING_CHUNK = 'RECORDING_CHUNK',
  RECORDED_CHUNK_PREVIEW = 'RECORDED_CHUNK_PREVIEW',
  UPLOADING_CHUNKS = 'UPLOADING_CHUNKS',
}

export type FinishedHandlerProps = {
  questions: QuestionConfig[];
  chunks: Array<{ link: string; duration: number }>;
  music: BackgroundMusicConfig | null;
  recordVideoWay: VideoRecordWayTypes | null;
};
export type FinishedHandler = (props: FinishedHandlerProps) => void;

export type TextDictionaryFunction<T = string> = (key: string, opts?: any) => T;

export type BlobUploader = (props: {
  blob: Blob;
  index: number;
  onProgress: (uploaded: number, total: number) => void;
  abortController: AbortController;
  originalFormat: 'mp4' | 'webm';
}) => Promise<string>;
