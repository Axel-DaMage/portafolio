import React, { useState, useEffect } from 'react';
import { Cursor } from '../ui/Cursor';

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay in ms
  showCursor?: boolean;
  cursorColor?: 'white' | 'magenta' | 'neon';
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 40,
  delay = 0,
  showCursor = true,
  cursorColor = 'magenta',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Initial delay trigger
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        // Safe check to index properly
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className="font-mono">
      {displayedText}
      {showCursor && started && displayedText.length < text.length && (
        <Cursor color={cursorColor} blink={false} />
      )}
      {showCursor && displayedText.length === text.length && (
        <Cursor color={cursorColor} blink={true} />
      )}
    </span>
  );
};
