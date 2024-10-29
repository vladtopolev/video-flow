export type QuestionConfig = {
  id: string;
  webText: string; // <- question shown during recording
  videoText?: string; // <- question shown in generated video for question
  tipText?: string;
  promptTip?: string;

  response?: string; // <- idea and possible way people should ask a question

  mandatory?: boolean;
  duration: {
    min: number;
    max: number;
  };
};

export type BackgroundMusicConfig = {
  name?: string;
  src: string;
  coverSrc?: string;
};

export enum DefaultScreenTypes {
  INITIAL_SETTINGS = 'INITIAL_SETTINGS',
  BEFORE_RECORDING = 'BEFORE_RECORDING',
}

export type TextDictionaryFunction = (key: string) => string;
