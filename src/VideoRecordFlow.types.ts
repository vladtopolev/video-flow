/* eslint-disable @typescript-eslint/no-explicit-any */
import { VideoRecordWayTypes } from './recordVideoWays';

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
  BEFORE_RECORDING = 'BEFORE_RECORDING',
  RECORDING_CHUNK = 'RECORDING_CHUNK',
  RECORDED_CHUNK_PREVIEW = 'RECORDED_CHUNK_PREVIEW',
  PICK_MUSIC = 'PICK_MUSIC',
  UPLOADING_CHUNKS = 'UPLOADING_CHUNKS',
}

export type FinishedHandlerAfterRecordingProcessProps = {
  width: number;
  height: number;
  questions: QuestionConfig[];
  chunks: Array<{
    link: string;
    duration: number;
  }>;
  music: BackgroundMusicConfig | null;
  recordVideoWay:
    | VideoRecordWayTypes.FREELY
    | VideoRecordWayTypes.RANDOM_QUESTIONS;
};

export type FinishedHadlerAfterUploadingOwnVideoProps = {
  recordVideoWay: VideoRecordWayTypes.UPLOAD_VIDEO;
  video: any;
};

export type FinishedHandlerProps =
  | FinishedHandlerAfterRecordingProcessProps
  | FinishedHadlerAfterUploadingOwnVideoProps;

export type FinishedHandler = (props: FinishedHandlerProps) => void;

export type TextDictionaryFunction<T = string> = (key: string, opts?: any) => T;

export type BlobUploader = (props: {
  blob: Blob;
  index: number;
  onProgress: (uploaded: number, total: number) => void;
  abortController: AbortController;
  originalFormat: 'mp4' | 'webm';
}) => Promise<string>;

export type FileUploader = (props: {
  file: File;
  onProgress: (uploaded: number, total: number) => void;
  abortController: AbortController;
}) => Promise<any>;

export type BrandStyle = {
  fontFamily: {
    title: string;
    body: string;
  };
  palette: {
    primary: string;
    secondary: string;
  };
};
