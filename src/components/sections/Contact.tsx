import React, { useState, useEffect, useRef } from 'react';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setSubmitted(false);
    setProgressVal(0);

    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += 20;
      setProgressVal(currentProgress);
      if (currentProgress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setLoading(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    }, 300);
  };

  return (
    <div className="font-mono text-sm space-y-6 py-2 select-text w-full flex flex-col items-center">
      <div className="flex justify-center items-center gap-2">
        <span className="text-[var(--color-magenta)] font-bold">axel@portafolio:~$</span>
        <span className="text-[var(--color-white)]">sendmail --init</span>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-lg items-center">
        {/* Contact form centered Box */}
        <Box borderStyle="single" color="magenta" title="MESSAGE_DISPATCHER" centerContent={true}>
          <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
              <label className="block text-xs text-[var(--color-neon)] font-bold mb-1 text-center">
                › SENDER_NAME:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full border-b border-[var(--color-white-20)] py-1 focus:border-[var(--color-magenta)] outline-none bg-transparent text-[var(--color-white)] text-center text-xs md:text-sm font-mono"
                disabled={loading}
              />
            </div>

            <div className="w-full max-w-sm">
              <label className="block text-xs text-[var(--color-neon)] font-bold mb-1 text-center">
                › SENDER_EMAIL:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full border-b border-[var(--color-white-20)] py-1 focus:border-[var(--color-magenta)] outline-none bg-transparent text-[var(--color-white)] text-center text-xs md:text-sm font-mono"
                disabled={loading}
              />
            </div>

            <div className="w-full max-w-sm">
              <label className="block text-xs text-[var(--color-neon)] font-bold mb-1 text-center">
                › SENDER_MESSAGE:
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full border border-[var(--color-white-20)] p-2 focus:border-[var(--color-magenta)] outline-none bg-transparent text-[var(--color-white)] text-center text-xs md:text-sm font-mono resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-center pt-2">
              <Button type="submit" variant="box" color="magenta" disabled={loading}>
                {loading ? 'SENDING...' : 'DISPATCH_MESSAGE'}
              </Button>
            </div>
          </form>
        </Box>

        {/* Social channels Box */}
        <Box borderStyle="single" color="neon" title="COMMUNICATION_CHANNELS" centerContent={true}>
          <div className="space-y-4 text-xs md:text-sm w-full flex flex-col items-center">
            <p className="text-xs text-[var(--color-white-60)] text-center max-w-xs leading-relaxed">
              Conéctate conmigo a través de mi perfil de GitHub o envíame un mensaje directo usando el despachador.
            </p>
            
            <Separator char="─" color="white" />
            
            <div className="space-y-2 text-xs text-center flex flex-col items-center">
              <div>
                <span className="text-[var(--color-neon)] mr-1">›</span>
                <span className="font-bold">GITHUB:</span>{' '}
                <a href="https://github.com/Axel-DaMage" target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--color-neon)]">
                  @Axel-DaMage
                </a>
              </div>
            </div>
          </div>
        </Box>
      </div>

      {/* Loading simulation output centered */}
      {loading && (
        <div className="space-y-2 border border-[var(--color-white-20)] p-3 bg-[var(--color-black)] w-full max-w-sm flex flex-col items-center justify-center text-center">
          <div className="text-xs text-[var(--color-neon)]">
            › sendmail --to axel@email.com
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-mono w-full">
            <span>[</span>
            <span className="text-[var(--color-neon)] font-bold">
              {'█'.repeat(Math.round(progressVal / 10))}
              {'░'.repeat(10 - Math.round(progressVal / 10))}
            </span>
            <span>] {progressVal}%</span>
          </div>
        </div>
      )}

      {/* Submission feedback */}
      {submitted && (
        <div className="space-y-2 w-full max-w-sm text-center flex flex-col items-center">
          <div className="text-xs text-[var(--color-white-40)]">
            › sendmail completed successfully
          </div>
          <Box borderStyle="single" color="neon" title="SUCCESS_LOG" centerContent={true}>
            <div className="text-xs md:text-sm text-[var(--color-neon)] font-bold uppercase tracking-wider">
              [INFO] MESSAGE SENT CORRECTLY.
            </div>
            <div className="text-xs text-[var(--color-white-60)] mt-1 max-w-xs text-center">
              Thank you! I will respond to your transmission as soon as possible.
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};
