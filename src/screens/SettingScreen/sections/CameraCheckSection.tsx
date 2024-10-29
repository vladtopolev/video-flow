import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import CameraStream from '../components/CameraStream/CameraStream';
import InstructionsCameraOff from '../components/InstructionsCameraOff/InstructionsCameraOff';
import InstructionsCameraOn from '../components/InstructionsCameraOn/InstructionsCameraOn';
import SetMediaDevicesButton from '../components/SetMediaDevicesButton/SetMediaDevicesButton';

const CameraCheckSection = () => {
  const {
    corners,
    spacing,
    palette,
    breakpoints: { md },
  } = useTheme();
  const {
    mediaStream: { stream },
  } = useVideoRecordFlowContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: palette.grey[100],
        borderRadius: corners.md,
        overflow: 'hidden',
        border: `1px solid ${palette.grey[300]}`,
        padding: spacing(4),
        gap: spacing(2),
        ...(md && {
          flexDirection: 'row',
          border: 'none',
          backgroundColor: 'unset',
          alignItems: 'stretch',
          padding: 0,
        }),
      }}
    >
      <div
        style={{
          width: 220,
          minWidth: 220,
          height: 342,
          borderRadius: corners.md,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CameraStream stream={stream} />
        {stream && <SetMediaDevicesButton />}
      </div>
      <div
        style={{
          backgroundColor: palette.grey[100],
          display: 'flex',
          alignItems: 'center',
          ...(md && {
            width: '100%',
            border: `1px solid ${palette.grey[300]}`,
            padding: spacing(4),
            borderRadius: corners.md,
            overflow: 'hidden',
          }),
        }}
      >
        {stream ? <InstructionsCameraOn /> : <InstructionsCameraOff />}
      </div>
    </div>
  );
};

export default CameraCheckSection;
