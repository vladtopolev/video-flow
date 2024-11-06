import { Box, MenuItem, Typography } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

import useTheme from '../../../../../../styles';
import { QuestionConfig } from '../../../../../../VideoRecordFlow.types';

const CheckedItem = ({ question }: { question: QuestionConfig }) => {
  const { spacing, palette, corners, typography } = useTheme();
  return (
    <MenuItem disabled sx={{ opacity: 1, '&.Mui-disabled': { opacity: 1 } }}>
      <Box
        sx={{
          width: '100%',
          py: spacing(3),
          px: spacing(2),
          textWrap: 'auto',
          backgroundColor: palette.grey[100],
          borderRadius: corners.sm,
          display: 'flex',
          gap: spacing(2),
          alignItems: 'center',
        }}
      >
        <Typography sx={{ ...typography.bodyL, fontWeight: 600, flexGrow: 1 }}>
          {question.webText}
        </Typography>
        <CheckIcon sx={{ color: palette.success.main }} />
      </Box>
    </MenuItem>
  );
};

export default CheckedItem;
