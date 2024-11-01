import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect((): (() => void) | void => {
    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return state;
};

export default useWindowSize;
