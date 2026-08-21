import React, { useState, useEffect } from 'react';
import { WindowPanel } from '../ui/WindowPanel';
import { Button } from '../ui/Button';
import { CorruptedBlock } from '../ui/CorruptedBlock';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

const GlitchingIASentence: React.FC = () => {
  const originalText = "Cuidado con mi IA que se ha quedado suelta";
  const [displayText, setDisplayText] = useState(originalText);
  const [opacity, setOpacity] = useState(1);
  const [contrast, setContrast] = useState(100);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let glitchInterval: ReturnType<typeof setInterval> | null = null;
    let fadeInterval: ReturnType<typeof setInterval> | null = null;

    // Stage 1: Wait 1.5s
    delayTimer = setTimeout(() => {
      const glitchChars = "$@#%&§?*!=+[]{}<>/\\|0123456789X█░▒▓";
      const startTime = Date.now();

      // Stage 2: Glitch rapidly for 500ms
      glitchInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;

        if (elapsed < 500) {
          const corrupted = originalText
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return Math.random() < 0.7
                ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                : char;
            })
            .join('');
          setDisplayText(corrupted);
        } else {
          if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
          }

          // Stage 3: Fade out opacity and contrast over 800ms
          const fadeStartTime = Date.now();
          fadeInterval = setInterval(() => {
            const fadeElapsed = Date.now() - fadeStartTime;
            const progress = Math.min(fadeElapsed / 800, 1);

            const scrambled = originalText
              .split('')
              .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
              .join('');
            setDisplayText(scrambled);

            setOpacity(1 - progress);
            setContrast(Math.round((1 - progress) * 100));

            if (progress >= 1) {
              if (fadeInterval) {
                clearInterval(fadeInterval);
                fadeInterval = null;
              }
              setDisplayText('');
            }
          }, 40);
        }
      }, 50);
    }, 1500);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (glitchInterval) clearInterval(glitchInterval);
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, []);

  return (
    <div
      style={{
        opacity: opacity,
        filter: `contrast(${contrast}%)`,
        transition: 'filter 0.05s ease, opacity 0.05s ease',
        minHeight: '1.5em',
      }}
      className="text-[var(--color-magenta)] text-shadow-[var(--text-glow-magenta)] font-bold text-center mt-4 text-xs md:text-sm select-none"
    >
      {displayText || '\u00A0'}
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="relative w-full h-full font-mono flex flex-col max-w-5xl mx-auto px-2 pb-2">
      
      {/* Contenedor principal desplazado hacia abajo para solaparse con el fondo del layout */}
      <div className="relative z-10 w-full flex-grow flex flex-col pt-[20vh] md:pt-[25vh]">
        {/* Grid Inferior para los paneles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-grow min-h-0">
        
        {/* 2. Panel de Bienvenida (ocupa más espacio) */}
        <CorruptedBlock className="md:col-span-8 h-full overflow-hidden flex flex-col" intensity="low">
          <WindowPanel 
            title="SYSTEM_OVERRIDE" 
            className="w-full h-full"
          >
            <div className="flex flex-col items-start w-full space-y-1.5 h-full overflow-y-auto pr-2">
              <div className="text-left text-[11px] md:text-xs text-[var(--color-white-80)] space-y-2 select-text flex-grow">
                <p className="leading-relaxed">
                  Tengo <span className="text-[var(--color-neon)] font-bold">20 años</span> y curso el tercer año de <span className="font-bold">Ingeniería en Informática</span>. Mi enfoque de estudio es altamente práctico, lo que me ha permitido aprender de forma acelerada y construir soluciones eficientes.
                </p>
                <p className="leading-relaxed text-[var(--color-white-60)]">
                  Mentores y colaboradores clave en el sector OpenSource:
                </p>
                <ul className="flex flex-col gap-1 list-none pl-1">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-magenta)] font-bold">›</span>
                    <span>Sergio Canales - Red Hat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-magenta)] font-bold">›</span>
                    <span>Armando Rivas - JSChile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-magenta)] font-bold">›</span>
                    <span>Carlos Abarzua - DuocUC</span>
                  </li>
                </ul>
                <p className="leading-relaxed pt-2 border-t border-[var(--color-neon-20)] mt-2">
                  Actualmente co-desarrollo la startup <span className="text-[var(--color-neon)] font-bold">LogOS</span> en conjunto con Javier Vargas.
                </p>
              </div>
              
              <div className="mt-auto pt-2 w-full border-t border-[var(--color-neon-20)] flex-shrink-0">
                <GlitchingIASentence />
              </div>
            </div>
          </WindowPanel>
        </CorruptedBlock>

        {/* Columna lateral para Datos y Acciones */}
        <div className="md:col-span-4 flex flex-col gap-3 min-h-0">
          
          {/* 3. Panel de Datos */}
          <CorruptedBlock className="flex-grow overflow-y-auto" intensity="medium">
            <WindowPanel 
              title="DATOS_DEL_SISTEMA" 
              className="w-full h-full"
            >
              <ul className="space-y-2.5 list-none text-left text-[11px] md:text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-[var(--color-magenta)] font-bold">›</span>
                  <div>
                    <span className="font-bold text-[var(--color-white-60)]">NOMBRE:</span> Axel Moraga<br/>
                    <span className="text-[var(--color-neon)] font-bold">@null.internal.exception</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[var(--color-magenta)] font-bold">›</span>
                  <div>
                    <span className="font-bold text-[var(--color-white-60)]">EDAD:</span> 20 Años
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[var(--color-magenta)] font-bold">›</span>
                  <div>
                    <span className="font-bold text-[var(--color-white-60)]">COMUNIDADES:</span><br/>
                    JSChile - OpenSourceStgo - CITT
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[var(--color-magenta)] font-bold">›</span>
                  <div>
                    <span className="font-bold text-[var(--color-white-60)]">EDUCACIÓN:</span><br/>
                    DuocUC // Ing. Informática
                  </div>
                </li>
              </ul>
            </WindowPanel>
          </CorruptedBlock>

          {/* 4. Panel de Acciones */}
          <CorruptedBlock className="flex-shrink-0" intensity="high">
            <WindowPanel 
              title="BINARIES_AND_ACTIONS" 
              className="w-full h-full"
            >
              <div className="flex flex-col gap-2.5 w-full">
                <Button
                  variant="box"
                  color="neon"
                  onClick={() => setActiveTab('projects')}
                  className="py-1.5 px-3 text-[11px] md:text-xs font-bold text-center tracking-wider w-full hover:bg-[var(--color-neon-20)] transition-colors"
                >
                  INICIALIZAR_PROYECTOS.EXE
                </Button>
                <Button
                  variant="box"
                  color="magenta"
                  onClick={() => setActiveTab('contact')}
                  className="py-1.5 px-3 text-[11px] md:text-xs font-bold text-center tracking-wider w-full hover:bg-[var(--color-magenta-20)] transition-colors"
                >
                  CONECTAR_CONTACTO.SH
                </Button>
              </div>
            </WindowPanel>
          </CorruptedBlock>

        </div>
      </div>
      {/* Fin del contenedor relativo */}
      </div>

    </div>
  );
};
