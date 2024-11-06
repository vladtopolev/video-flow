import { CSSProperties, ReactNode, MouseEvent } from 'react';
import useTheme from '../../../../../../styles';

const Container = ({
  children,
  onClick,
  style,
}: {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}) => {
  const { spacing, palette, corners } = useTheme();
  return (
    <div
      onClick={onClick}
      style={{
        padding: spacing(4),
        border: '1px solid',
        borderColor: palette.grey[400],
        borderRadius: corners.md,
        display: 'flex',
        gap: spacing(2),
        alignItems: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
