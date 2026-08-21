import React, { useState, useEffect } from 'react';

interface CorruptedBlockProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const CorruptedBlock: React.FC<CorruptedBlockProps> = ({ 
  children, 
  className = '', 
  intensity = 'medium' 
}) => {
  const [isCorrupted, setIsCorrupted] = useState(false);

  useEffect(() => {
    // Definir tiempos en base a intensidad
    const minDelay = intensity === 'high' ? 1000 : intensity === 'medium' ? 3000 : 5000;
    const randDelay = intensity === 'high' ? 2000 : intensity === 'medium' ? 5000 : 8000;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextCorruption = () => {
      const nextCorruptionIn = minDelay + Math.random() * randDelay;
      
      timeoutId = setTimeout(() => {
        setIsCorrupted(true);
        
        setTimeout(() => {
          setIsCorrupted(false);
          scheduleNextCorruption();
        }, 150 + Math.random() * 200); // 150ms a 350ms duration
        
      }, nextCorruptionIn);
    };

    scheduleNextCorruption();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [intensity]);

  return (
    <div className={`relative ${isCorrupted ? 'corrupted-active z-50' : ''} ${className}`}>
      {children}
    </div>
  );
};