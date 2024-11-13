export default {
  Buttons: {
    Cancel: 'Cancel',
    Play: 'Play',
    Back: 'Back',
  },
  Titles: {
    TipTitle: 'Important Note',
  },
  CameraStream: {
    NoAccess: 'No camera access',
  },
  CameraSettings: {
    Modal: {
      Title: 'Video Settings',
      Description:
        'Choose input source for your camera and microphone. You can change this selection any time.',
      Fields: {
        Camera: {
          Label: 'Camera',
        },
        Microphone: {
          Label: 'Microphone',
        },
      },
      Buttons: {
        Close: 'Continue',
      },
    },
  },
  Instructions: {
    CameraOff: {
      Title: 'Important Note',
      Description:
        "To record video, we need access to your camera and microphone. Please enable these permissions in your browser or system settings.\nIf you're having issues: \n• Ensure no other apps are using your camera \n• Try a different browser \n• Restart your browser \n• Restart your computerIf problems persist, contact support and we would be happy to help you!",
      Button: 'Instructions',
    },
    CameraOn: {
      Label: 'Checklist',
      Tips: [
        'Position your device on a solid surface to eliminate shaking.',
        'Consider recording while standing to achieve a more natural output.',
        'Ensure you are clearly visible on camera.',
        'Eliminate any extraneous sounds.',
        'If using teleprompter, standing a few feet from the camera will hide your eye movements while reading.',
        'You can always restart the recording if you misspeak!',
      ],
    },
  },
  VideoRecordWay: {
    Options: {
      Freely: {
        Title: 'I am comfortable speaking without prompts.',
        Description: 'Max 3 minutes.',
      },
      Questionary: {
        Title: 'I would like teleprompter-style recording with prompts.',
        Description: 'Choose up to 4 prompts for guided recording.',
      },
      RandomQuestions: {
        Title: 'I would like teleprompter-style recording with prompts.',
        Description: 'Choose up to 4 prompts for guided recording.',
      },
      UploadVideo: {
        Title: 'Upload my own video',
        Description:
          'Select a pre-recorded video if you do not want to record it again.',
      },
    },
  },
  BackgroundMusic: {
    Title:
      'Your video is almost ready! Would you like to add background music?',
    Subtitle:
      'Volume will be much lower in the final video than in the preview',
    NoMusicOptions: {
      Title: 'No background music please!',
      Description: 'I prefer silence.',
    },
  },
  PickVideoRecordWay: {
    Title: 'Lets record your introduction video',
  },
  SettingVideoFlowScreen: {
    Title: "Let's record your video",
    Buttons: {
      Cancel: 'Cancel',
      Next: 'Next',
    },
  },
  BeforeRecordingScreen: {
    FreelySpeechTitle: 'I am... Describe yourself, your hobbies and goals.',
    Tip: 'You can re-record all videos as many times as you need.',
    Controls: {
      Notes: {
        Label: 'Add notes to help you speak',
        Placeholder: 'Note...',
      },
    },
    Buttons: {
      Back: 'Back',
      Next: "Let's go",
      Cancel: 'Cancel',
    },
  },
  RecordingChunkScreen: {
    LookAtTheCamera: '☝️ Remember to look at the camera',
  },
  PreviewRecordedChunkScreen: {
    Buttons: {
      Cancel: 'Cancel',
      Rerecord: 'Re-record',
      Save: 'Save',
      Back: 'Back',
    },
  },
  UploadingChunkScreen: {
    Progress: {
      SubTitle: 'Creating your video',
      Title:
        'It may take several minutes. We suggest to take a sip of water and stretch or do a few pushups. 😉',
      ProgressText: 'Generation {{progress}}%',
      Tip: 'Please do not close this browser tab until the process is complete.',
    },
  },
  PreviewFinalVideo: {
    Buttons: {
      Delete: 'Delete',
      LastAction: 'Complete',
    },
  },
};
