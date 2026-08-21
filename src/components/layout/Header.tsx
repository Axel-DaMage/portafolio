import React from 'react';
import { Button } from '../ui/Button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: '1. INICIO' },
    { id: 'projects', label: '2. PROYECTOS' },
    { id: 'skills', label: '3. HABILIDADES' },
    { id: 'contact', label: '4. CONTACTO' },
  ];

  return (
    <header className="flex flex-col items-center justify-center font-mono select-none w-full mb-6 border-b border-[var(--color-white-10)] pb-4 text-center">
      {/* Centered Navigation Menu */}
      <nav className="flex flex-wrap items-center justify-center gap-2 bg-[var(--color-black)] border border-[var(--color-white-10)] p-1.5 rounded-none max-w-xl w-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              color={isActive ? 'magenta' : 'white'}
              active={isActive}
              onClick={() => setActiveTab(item.id)}
              className={`py-1 px-4 text-xs transition-all flex-grow justify-center ${
                isActive
                  ? 'font-bold'
                  : 'hover:bg-[var(--color-white-05)]'
              }`}
            >
              [{item.label}]
            </Button>
          );
        })}
      </nav>
    </header>
  );
};
