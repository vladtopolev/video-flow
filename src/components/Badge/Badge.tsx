import { Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import useTheme from '../../styles';

const Badge = ({
  children,
  style,
}: {
  children: ReactNode;
  style: CSSProperties;
}) => {
  const { corners, typography, spacing, palette } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        padding: `${spacing(0.5)} ${spacing(2)}`,
        backgroundColor: palette.primary.main,
        borderRadius: corners.sm,
        color: palette.error.contrastText,
        ...style,
      }}
    >
      <Typography sx={{ ...typography.titleXS, color: 'inherit' }}>
        {children}
      </Typography>
    </div>
  );
};

export default Badge;
