import type {
  BackgroundMusicConfig,
  QuestionConfig,
} from './VideoRecordFlow.types';

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
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '2',
    webText: 'When people meet me, they would never guess ...',
    tipText: '',
    mandatory: true,
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
  {
    id: '6',
    webText: 'Can you tell me about a project you are most proud of?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '7',
    webText:
      'What skills or expertise do you bring to your team or organization?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '8',
    webText: 'What is your "superpower"?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '9',
    webText: 'What professional accomplishments you’re particularly proud of?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '10',
    webText: 'What new skills are you eager to learn or develop further?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '11',
    webText:
      'Are there any professional challenges you’re currently facing and working to overcome?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '12',
    webText:
      'Can you share an example of a successful partnership or collaboration you’ve been part of?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '13',
    webText: 'How do you seek opportunities for professional development?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '14',
    webText: 'What type of work environment helps you thrive?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '15',
    webText: "What's your approach to receiving and giving feedback?",
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '16',
    webText:
      'Are there any leaders or mentors who have significantly impacted your career?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '17',
    webText: 'How do you measure success in your role and career?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '18',
    webText: 'Can you share an example of a challenging problem you’ve solved?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '19',
    webText:
      'How do you foster innovation and creativity within your role or team?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '20',
    webText: 'What’s your approach to making important decisions?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '21',
    webText:
      'Can you give an example of a risk you took in your career and its outcome?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '22',
    webText:
      'How do you approach change and adaptability within your role or organization?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '23',
    webText: 'How do you maintain and build professional relationships?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '24',
    webText:
      'What value do you find in professional networking and building relationships?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '25',
    webText:
      "What professional organizations or groups you're part of that bring you value?",
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '26',
    webText: 'What hobbies or activities do you enjoy outside of work?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '27',
    webText:
      'How do you ensure your personal well-being and professional growth are balanced?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '28',
    webText:
      'Are there any personal habits that contribute positively to your professional life?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '29',
    webText:
      'Can you share an example of how diversity and inclusion have positively impacted your professional experience?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '30',
    webText:
      'How do you ensure your team or organization is inclusive and equitable?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '31',
    webText:
      "What are the benefits you've observed from diverse and inclusive teams or organizations?",
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '32',
    webText:
      'Can you share insights or suggestions for improving diversity and inclusion in a professional setting?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '33',
    webText: 'How did you get into your field?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '34',
    webText: 'What do you enjoy most about your current role?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '35',
    webText: 'What are your short and long-term career goals?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '36',
    webText: 'Who has been your most impactful mentor?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },

  {
    id: '37',
    webText: 'What values are most important to you in a workplace?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '38',
    webText: 'What is your favorite project you’ve worked on and why?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '39',
    webText: 'What is the biggest professional risk you’ve taken?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '40',
    webText: 'What are some things you do outside of work for fun?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '41',
    webText: 'What is your favorite book and why?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '42',
    webText: 'Who is your role model in business?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '43',
    webText: 'What is your proudest work accomplishment?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '44',
    webText: "What is the best career advice you've received?",
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '45',
    webText: 'How do you handle stress at work?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '46',
    webText: 'How do you prioritize your work when everything seems urgent?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '47',
    webText: 'What energizes you at work? What drains you?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '48',
    webText: 'What is your preferred way of receiving feedback?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },

  {
    id: '49',
    webText: 'What is your leadership style?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '50',
    webText: 'What is your biggest pet peeve at work?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '51',
    webText: 'What is your favorite thing about the company culture here?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '52',
    webText:
      'If you had an unlimited budget, what is the first thing you would change at work?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '53',
    webText:
      'What has been your biggest professional failure and what did you learn from it?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '54',
    webText: 'What is your favorite motivational quote?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '55',
    webText: 'Who has been your most impactful coworker/colleague and why?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '56',
    webText:
      "What is one piece of advice you'd give your younger self about work?",
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '57',
    webText: 'How do you define success in your career?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '58',
    webText: 'What is your greatest strength as a team member?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '59',
    webText: 'What is one area you are working to improve?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '60',
    webText: 'What is your preferred leadership style in a manager?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },

  {
    id: '61',
    webText: 'How do you ensure your team feels valued and supported?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '62',
    webText: 'What is one long-term goal you have for your team?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '63',
    webText:
      'What do you think is the key to building strong professional relationships?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
  {
    id: '64',
    webText: 'How do you encourage innovation and creativity on your team?',
    tipText: '',
    duration: {
      min: MIN_VIDEO_DURATION,
      max: MAX_VIDEO_DURATION,
    },
  },
];
