import { useMemo, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';

const useControlContainerWidth = () => {
  const [videoContainerWidth, setVideoContainerWidth] = useState(0);
  const { width: windowWidth } = useWindowSize();

  const controlContainerWidth = useMemo(() => {
    if (videoContainerWidth > 400) {
      return videoContainerWidth;
    }
    return windowWidth > 400 ? 400 - 24 * 2 : '100%';
  }, [windowWidth, videoContainerWidth]);

  return { controlContainerWidth, setVideoContainerWidth };
};

export default useControlContainerWidth;
