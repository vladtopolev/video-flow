import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Videocam as VideocamIcon } from '@mui/icons-material';
import useTheme from '../../styles';
import utils from '../../utils';

const tips = [
  '· Max 10MB each (20MB for videos)',
  '· High resolution video(mp4)',
];

const FileDropZone = ({
  accept = ['video/*'],
  onChange,
  multiple,
}: {
  accept?: string[];
  onChange?: (files: File[]) => void;
  multiple?: boolean;
}) => {
  const { getRootProps, getInputProps, open, isDragActive, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        onChange?.(acceptedFiles);
      },
      accept:
        accept && accept.reduce((memo, file) => ({ ...memo, [file]: [] }), {}),
      multiple,
    });

  const { spacing, palette, typography, corners } = useTheme();

  const backgroundActive = isDragReject
    ? utils.hex2rgba(palette.error.main, 0.2)
    : utils.hex2rgba(palette.success.main, 0.2);

  const borderColorActive = isDragReject
    ? utils.hex2rgba(palette.error.main, 0.2)
    : utils.hex2rgba(palette.success.main, 0.2);

  return (
    <div
      {...getRootProps()}
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
        borderColor: isDragActive ? borderColorActive : palette.grey[300],
        backgroundColor: isDragActive ? backgroundActive : palette.grey[100],
        borderRadius: corners.md,
      }}
    >
      <input {...getInputProps()} />
      <VideocamIcon sx={{ color: palette.grey[400] }} />
      <Typography sx={{ ...typography.titleS, textAlign: 'center' }}>
        Drag and drop your video or{' '}
        <span
          style={{ cursor: 'pointer', color: palette.info.main }}
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          Browse
        </span>
      </Typography>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing(2),
          justifyContent: 'center',
        }}
      >
        {tips.map((tip) => (
          <Typography
            key={tip}
            sx={{ ...typography.bodyS, color: palette.text.secondary }}
          >
            {tip}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default FileDropZone;
