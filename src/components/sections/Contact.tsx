import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="font-mono text-left w-full select-text space-y-3">
      <div className="flex items-center gap-2 text-xs text-ctp-mauve font-bold pb-1">
        <span>axel@portafolio:~$</span>
        <span className="text-ctp-teal">cat contact.txt</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {/* Email Direct Channel */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2.5">
          <div className="text-xs font-bold border-b border-ctp-surface0 pb-1 text-ctp-mauve">
            Correo directo
          </div>

          <p className="text-xs text-ctp-subtext leading-relaxed">
            Puedes escribirme directamente para colaboraciones, propuestas de software, o consultas sobre proyectos open-source.
          </p>

          <div className="pt-1">
            <a
              href="mailto:axel.d4mage@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-ctp-surface0 border border-ctp-surface1 hover:border-ctp-surface2 hover:bg-ctp-surface1 text-ctp-teal font-bold text-xs transition-colors"
            >
              <span>axel.d4mage@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Channels & Location */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2.5">
          <div className="text-xs font-bold border-b border-ctp-surface0 pb-1 text-ctp-teal">
            Redes y ubicación
          </div>

          <div className="space-y-1.5 text-xs text-ctp-subtext">
            <div>
              <span className="text-ctp-peach mr-1.5">›</span>
              <span>GitHub:</span>{' '}
              <a
                href="https://github.com/Axel-DaMage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ctp-blue hover:underline font-bold"
              >
                @Axel-DaMage
              </a>
            </div>

            <div>
              <span className="text-ctp-peach mr-1.5">›</span>
              <span>Repositorio:</span>{' '}
              <a
                href="https://github.com/Axel-DaMage/portafolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ctp-mauve hover:underline font-bold"
              >
                portafolio
              </a>
            </div>

            <div>
              <span className="text-ctp-peach mr-1.5">›</span>
              <span>Ubicación:</span>{' '}
              <span className="text-[var(--color-white-80)]">Santiago, Chile (UTC-3)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
