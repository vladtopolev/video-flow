import type { Meta, StoryObj } from '@storybook/react';

import VideoRecordFlow from './VideoRecordFlow';
import { BRAND_STYLES } from './VideoRecordFlow.default';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'VideoRecordFlow',
  component: VideoRecordFlow,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    questionList: { control: 'object' },
    backgroundMusicList: { control: 'object' },
    textDictionary: { control: 'object' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof VideoRecordFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

const DELAY = 20;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    width: 1440,
    height: 1080,
    textDictionary: (key: string) => {
      if (key === 'VideoRecordWay.Options.Freely.Description') {
        return 'Max 3 minutes. ==>Custom text';
      }
    },
    onCancel: () => {
      console.log('cancel');
    },
    onFinished: (props) => {
      console.log('finished', props);
    },
    brandStyle: {
      ...BRAND_STYLES,
      palette: {
        primary: '#4338CA',
        secondary: '#F95D51',
      },
    },
    blobUploader: ({ index, onProgress, originalFormat }) =>
      new Promise((resolve) => {
        let counter = 0;
        const id = setInterval(() => {
          if (counter >= DELAY) {
            clearInterval(id);
            resolve(`${index}.${originalFormat}`);
            return;
          }
          counter++;
          onProgress(counter, DELAY);
        }, 1000);
      }),

    fileUploader: ({ onProgress, file }) =>
      new Promise<string>((resolve) => {
        let counter = 0;
        const id = setInterval(() => {
          if (counter >= DELAY) {
            clearInterval(id);
            resolve(file.name);
            return;
          }
          counter++;
          onProgress(counter, DELAY);
        }, 1000);
      }),
  },
};
