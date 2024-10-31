import { useCallback, useState } from 'react';

type TelepromterSettings = {
  fontSize: number;
  speed: number;
  shouldBeScrolled: boolean;
};

const useTelepromterSettings = () => {
  const [telepromterSettings, setTelepromterSettings] =
    useState<TelepromterSettings>({
      fontSize: 32,
      speed: 2,
      shouldBeScrolled: true,
    });

  const setFontSize = useCallback(
    (fontSize) => setTelepromterSettings((prev) => ({ ...prev, fontSize })),
    [],
  );
  const setSpeed = useCallback(
    (speed) => setTelepromterSettings((prev) => ({ ...prev, speed })),
    [],
  );

  const setShouldBeScrolled = useCallback(
    (shouldBeScrolled: boolean) =>
      setTelepromterSettings((prev) => ({ ...prev, shouldBeScrolled })),
    [],
  );

  return { ...telepromterSettings, setFontSize, setSpeed, setShouldBeScrolled };
};
export default useTelepromterSettings;
