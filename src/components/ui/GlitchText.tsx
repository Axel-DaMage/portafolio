import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', delay = 3000 }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let glitchTimeout: ReturnType<typeof setTimeout>;
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      glitchTimeout = setTimeout(() => setIsGlitching(false), 250); // Glitch lasts 250ms
    }, delay + Math.random() * 2000); // Random offset for organic feel

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(glitchTimeout);
    };
  }, [delay]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[2px] -ml-[2px] text-[var(--color-magenta)] z-0 opacity-80" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px, 1px)' }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-[-2px] ml-[2px] text-[var(--color-neon)] z-0 opacity-80"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', transform: 'translate(2px, -1px)' }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};