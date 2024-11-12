import { Box, MenuItem, Typography } from '@mui/material';
import { DeleteOutline as DeleteIcon } from '@mui/icons-material';
import useTheme from '../../../../../../styles';

const EmptyItem = ({ onClick }: { onClick: () => void }) => {
  const { spacing, typography, palette } = useTheme();
  return (
    <MenuItem onClick={onClick}>
      <Box
        sx={{
          width: '100%',
          py: spacing(3),
          px: spacing(2),
          textWrap: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ ...typography.bodyL }}>
          Leave empty (remove question)
        </Typography>
        <DeleteIcon sx={{ color: palette.grey[500] }} />
      </Box>
    </MenuItem>
  );
};

export default EmptyItem;
