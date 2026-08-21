import { useState, useEffect } from 'react';

export const useLiveTimer = (targetDateString: string) => {
  const [elapsedString, setElapsedString] = useState('');

  useEffect(() => {
    const calculateElapsed = () => {
      const now = new Date();
      const target = new Date(targetDateString);
      const diffMs = now.getTime() - target.getTime();
      
      if (isNaN(diffMs) || diffMs < 0) {
        setElapsedString('0s ago');
        return;
      }

      const diffSecs = Math.floor(diffMs / 1000);
      const secs = diffSecs % 60;
      const diffMins = Math.floor(diffSecs / 60);
      const mins = diffMins % 60;
      const diffHrs = Math.floor(diffMins / 60);
      const hrs = diffHrs % 24;
      const days = Math.floor(diffHrs / 24);

      let result = '';
      if (days > 0) result += `${days}d `;
      if (hrs > 0 || days > 0) result += `${hrs}h `;
      if (mins > 0 || hrs > 0 || days > 0) result += `${mins}m `;
      result += `${secs}s ago`;

      setElapsedString(result);
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return elapsedString;
};
