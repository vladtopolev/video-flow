import { Box, MenuItem, Typography } from '@mui/material';
import useTheme from '../../../../../../styles';

const EmptyItem = ({ onClick }: { onClick: () => void }) => {
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
        <Typography sx={{ ...typography.bodyL }}>
          Leave empty (remove question)
        </Typography>
      </Box>
    </MenuItem>
  );
};

export default EmptyItem;
