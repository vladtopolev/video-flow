import { Box, Button, SxProps, Typography } from '@mui/material';
import useTheme from '../../styles';

type SliderWithButtonsProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const buttonsSx: SxProps = {
  width: 24,
  height: 24,
  minWidth: 'unset',
  color: 'white',
  backgroundColor: 'background.light_30',
  borderRadius: '0',
};
const SliderWithButtons = ({
  value,
  onChange,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  disabled,
}: SliderWithButtonsProps) => {
  const { palette, typography } = useTheme();
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${palette.background.light_30}`,
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <Button
        onClick={() => onChange(value - step)}
        disabled={disabled || value <= min}
        sx={{
          ...buttonsSx,
        }}
      >
        -
      </Button>
      <Typography
        sx={{
          ...typography.bodyM,
          minWidth: 36,
          textAlign: 'center',
          color: 'white',
          borderRight: '1px solid',
          borderLeft: '1px solid',
          borderColor: palette.background.light_30,
          height: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>
      <Button
        onClick={() => onChange(value + step)}
        disabled={disabled || value >= max}
        sx={buttonsSx}
      >
        +
      </Button>
    </Box>
  );
};

export default SliderWithButtons;
