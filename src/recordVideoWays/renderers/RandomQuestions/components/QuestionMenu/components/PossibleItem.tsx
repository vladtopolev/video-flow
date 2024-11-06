import { Box, MenuItem, Typography } from '@mui/material';

import useTheme from '../../../../../../styles';
import { QuestionConfig } from '../../../../../../VideoRecordFlow.types';

const PossibleItem = ({
  question,
  onClick,
}: {
  question: QuestionConfig;
  onClick: () => void;
}) => {
  const { spacing, typography } = useTheme();
  return (
    <MenuItem onClick={onClick}>
      <Box
        sx={{
          width: '100%',
          py: spacing(3),
          px: spacing(2),
          textWrap: 'auto',
        }}
      >
        <Typography sx={{ ...typography.bodyL }}>{question.webText}</Typography>
      </Box>
    </MenuItem>
  );
};

export default PossibleItem;
