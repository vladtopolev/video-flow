import type {
  BackgroundMusicConfig,
  BrandStyle,
  QuestionConfig,
} from './VideoRecordFlow.types';

export const BRAND_STYLES: BrandStyle = {
  fontFamily: {
    title: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  palette: {
    primary: '#4338CA',
    secondary: '#FFB000',
  },
};

export const DEFAULT_BACKGROUND_MUSIC_LIST: BackgroundMusicConfig[] = [
  {
    name: 'A Breath of Hope',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205380/video-composition/music/001_6min_cvbt30.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover_ige2ms.jpg',
  },
  {
    name: 'Better Life',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205402/video-composition/music/002_6min_gmb3hm.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-1_ndv3cg.jpg',
  },
  {
    name: 'Beyond Reality',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205402/video-composition/music/003_6min_oigdyy.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-2_wuzdry.jpg',
  },
  {
    name: 'Bright Eyes',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205400/video-composition/music/004_6min_zuckgw.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-3_o6isna.jpg',
  },
  {
    name: 'Come Alive',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205402/video-composition/music/005_6min_amjszk.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-4_kvnqpg.jpg',
  },
  {
    name: 'Around the Fire',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205402/video-composition/music/006_6min_ti0de2.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-5_wbh6rc.jpg',
  },
  {
    name: 'Out of the Woods',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205402/video-composition/music/008_6min_mnfgp5.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-6_koevjh.jpg',
  },
  {
    name: 'Practicality',
    src: 'https://res.cloudinary.com/evernester/video/upload/v1683205404/video-composition/music/009_6min_nkzsas.mp3',
    coverSrc:
      'https://res.cloudinary.com/evernester/image/upload/v1694084261/common/audio-covers/Cover-7_n9fjeb.jpg',
  },
];

const MAX_VIDEO_DURATION = 40;
const MIN_VIDEO_DURATION = 0;

export const DEFAULT_QUESTION_LIST: QuestionConfig[] = [
  {
    id: '1',
    webText: 'Please complete: I am ...',
    videoText: 'I am ...',
    tipText: '',
    mandatory: true,
    promptTip: 'QUestion 1 propmt',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '2',
    webText: 'When people meet me, they would never guess ...',
    tipText: '',
    promptTip: 'QUestion 2 propmt',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '3',
    webText: 'Describe your career journey',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '4',
    webText:
      'Can you share the most pivotal moment in your professional journey so far?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '5',
    webText: 'What motivated you to choose your current role or profession?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
];
