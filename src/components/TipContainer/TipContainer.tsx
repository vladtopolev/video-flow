import { Box, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import useTheme from '../../styles';

export type NoteProps = {
  title?: string;
  tipText: string;
  style?: CSSProperties;
};

const TipContainer = ({ title, tipText, style }: NoteProps) => {
  const { spacing, palette, corners, typography } = useTheme();
  return (
    <div
      className="tip-container"
      style={{
        padding: spacing(4),
        backgroundColor: palette.grey[100],
        borderRadius: corners.sm,
        border: `1px solid ${palette.grey[400]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="div" sx={{ ...typography.titleXS }}>
          {title}
        </Typography>
        <Typography sx={{ ...typography.bodyM }}>{tipText}</Typography>
      </Box>
    </div>
  );
};

export default TipContainer;
