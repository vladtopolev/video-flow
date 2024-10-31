import { ReactNode } from 'react';
import useTheme from '../../styles';

const ReacordingLayout = ({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) => {
  const { spacing } = useTheme();
  return (
    <div
      className="RecordingLayout"
      style={{
        width: '100%',
        height: '100dvh',
        position: 'relative',
        padding: spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className="RecordingLayout__content"
        style={{
          flex: 1,
          width: '100%',
          height: '1px',
        }}
      >
        {children}
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default ReacordingLayout;
