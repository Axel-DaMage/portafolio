import { useState, useEffect } from 'react';
import { formatElapsedTime } from '../utils';

export const useLiveTimer = (targetDateString: string): string => {
  const [elapsedString, setElapsedString] = useState<string>(() =>
    formatElapsedTime(targetDateString)
  );

  useEffect(() => {
    const updateElapsed = () => {
      setElapsedString(formatElapsedTime(targetDateString));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return elapsedString;
};
