import { LinearProgress, Typography } from '@mui/material';
import useTheme from '../../styles';
import { Videocam as VideocamIcon } from '@mui/icons-material';
import { Close as CloseIcon } from '@mui/icons-material';

const FileUploadInfo = ({
  file,
  progress,
  onCancel,
}: {
  file: File;
  progress: number;
  onCancel?: () => void;
}) => {
  const { spacing, palette, corners, typography } = useTheme();
  return (
    <div
      style={{
        padding: spacing(6),
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'hover',
        border: '1px solid',
        gap: spacing(2),
        borderColor: palette.grey[300],
        backgroundColor: palette.grey[100],
        borderRadius: corners.md,
        position: 'relative',
      }}
    >
      <CloseIcon
        onClick={onCancel}
        sx={{
          position: 'absolute',
          top: spacing(4),
          right: spacing(4),
          color: palette.primary.dark,
        }}
      />
      <VideocamIcon sx={{ color: palette.grey[400] }} />
      <Typography sx={{ ...typography.titleS, color: palette.text.disabled }}>
        {file.name}
      </Typography>
      <Typography sx={{ ...typography.bodyS, color: palette.text.secondary }}>
        Uploading...
      </Typography>
      <LinearProgress
        value={progress}
        variant="determinate"
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 1,
          mt: spacing(4),
        }}
      />
    </div>
  );
};

export default FileUploadInfo;
