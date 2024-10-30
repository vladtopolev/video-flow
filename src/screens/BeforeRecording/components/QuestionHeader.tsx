import { TimerOutlined as TimerIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';

const QuestionHeader = () => {
  const {
    minVideoDurationDefault,
    maxVideoDurationDefault,
    userChoise: { currentQuestionIndex, pickedQuestions },
  } = useVideoRecordFlowContext();
  const { spacing, palette, typography } = useTheme();

  const minSec =
    pickedQuestions[currentQuestionIndex]?.duration?.min ||
    minVideoDurationDefault;
  const maxSec =
    pickedQuestions[currentQuestionIndex]?.duration?.max ||
    maxVideoDurationDefault;

  if (pickedQuestions.length === 1) {
    return (
      <Typography
        sx={{ color: palette.primary.dark, ...typography.titleS }}
        component="div"
      >
        <TimerIcon sx={{ mr: 2, verticalAlign: 'bottom' }} />
        The duration of the video is up to {maxSec / 60} min.
      </Typography>
    );
  }

  const index = currentQuestionIndex;
  const total = pickedQuestions.length;

  return (
    <Box sx={{ display: 'flex', color: palette.primary.dark }}>
      <Typography sx={{ mr: spacing(2), ...typography.titleS }}>
        Prompt {index + 1}/{total}
      </Typography>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          marginRight: spacing(12),
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: `${100 / total}%`,
              mr: 2,
              borderRadius: 2,
              backgroundColor:
                i <= index ? palette.secondary.main : palette.grey[300],
              height: 4,
            }}
          />
        ))}
      </div>

      <Typography sx={typography.titleS}>
        <TimerIcon sx={{ verticalAlign: 'bottom', mr: spacing(2) }} />
        {minSec}-{maxSec} sec
      </Typography>
    </Box>
  );
};

export default QuestionHeader;
