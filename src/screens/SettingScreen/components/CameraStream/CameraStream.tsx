import { VideocamOff as VideocamOffIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import { useVideoRecordFlowContext } from '../../../../context/VideoRecordFlow.context';
import useTheme from '../../../../styles';
import StreamVideoPlayer from '../../../../components/StreamVideoPlayer/StreamVideoPlayer';

const Container = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      aspectRatio: '220/342',
      position: 'relative',
      color: 'white',
      ...style,
    }}
  >
    {children}
  </div>
);

const CameraStream = ({
  stream,
  style,
}: {
  stream: MediaStream | null;
  style?: CSSProperties;
}) => {
  const { palette } = useTheme();
  const { textDictionary } = useVideoRecordFlowContext();

  if (!stream) {
    return (
      <Container style={style}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: palette.common.black,
            color: palette.common.white,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VideocamOffIcon />
          <Typography
            sx={{ pt: 1, textTransform: 'uppercase', fontWeight: 600 }}
          >
            {textDictionary('CameraStream.NoAccess')}
          </Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container style={style}>
      <StreamVideoPlayer
        stream={stream}
        style={{ width: '100%', height: '100%' }}
      />
    </Container>
  );
};

export default CameraStream;
