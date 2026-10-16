import React from 'react';

export const About: React.FC = () => {
  const skillCategories = [
    {
      title: 'Lenguajes y Entornos',
      color: 'text-ctp-mauve',
      items: ['TypeScript', 'JavaScript', 'Go', 'Rust (en aprendizaje)', 'Python', 'SQL', 'Bash'],
    },
    {
      title: 'Frontend e Interfaces',
      color: 'text-ctp-teal',
      items: ['React 19+', 'Next.js', 'CSS Modules / CSS Moderno', 'Diseño TUI y Terminal', 'Gestión de estado'],
    },
    {
      title: 'Backend y Sistemas',
      color: 'text-ctp-blue',
      items: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Entornos Linux', 'APIs REST y gRPC'],
    },
  ];

  return (
    <div className="font-mono text-left w-full select-text space-y-3">
      <div className="flex items-center gap-2 text-xs text-ctp-mauve font-bold pb-1">
        <span>axel@portafolio:~$</span>
        <span className="text-ctp-teal">cat skills.json</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2 hover:border-ctp-surface2 transition-colors"
          >
            <div className={`text-xs font-bold border-b border-ctp-surface0 pb-1 ${cat.color}`}>
              {cat.title}
            </div>

            <ul className="space-y-1.5 text-xs text-ctp-subtext">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-ctp-peach font-bold">›</span>
                  <span className="text-[var(--color-white-80)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
