import { useVideoRecordFlowContext } from '../../../context/VideoRecordFlow.context';
import useTheme from '../../../styles';
import CameraStream from '../components/CameraStream/CameraStream';
import InstructionsCameraOff from '../components/InstructionsCameraOff/InstructionsCameraOff';
import InstructionsCameraOn from '../components/InstructionsCameraOn/InstructionsCameraOn';

const CameraCheckSection = () => {
  const { corners, spacing, palette } = useTheme();
  const {
    mediaStream: { stream },
  } = useVideoRecordFlowContext();
  return (
    <div style={{ display: 'flex', gap: spacing(4) }}>
      <div
        style={{
          width: 220,
          minWidth: 220,
          height: 342,
          borderRadius: corners.md,
          overflow: 'hidden',
        }}
      >
        <CameraStream stream={stream} />
      </div>
      <div
        style={{
          backgroundColor: palette.grey[100],
          display: 'flex',
          alignItems: 'center',
          padding: spacing(4),
          borderRadius: corners.md,
          overflow: 'hidden',
          border: `1px solid ${palette.grey[300]}`,
          width: '100%',
        }}
      >
        {stream ? <InstructionsCameraOn /> : <InstructionsCameraOff />}
      </div>
    </div>
  );
};

export default CameraCheckSection;
