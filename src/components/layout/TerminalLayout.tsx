import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface TerminalLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TerminalLayout: React.FC<TerminalLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="crt-screen w-screen h-screen flex flex-col overflow-hidden relative">
      <div className="scanlines" />
      <div className="crt-vignette" />
      
      {/* Banner de Fondo Global (Absolutamente pegado al techo de la pantalla) */}
      {activeTab === 'dashboard' && (
        <div className="absolute top-0 left-0 w-full pointer-events-none z-0 banner-melt-container">
          <img
            src="/user_img.png"
            alt="Axel Moraga"
            className="w-full opacity-10"
          />
          {/* Sombra base para asegurar el blend a negro */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 40%, #101116 100%)'
            }}
          />
        </div>
      )}

      {/* Expanded maximum-width retro console monitor envelope */}
      <div className="w-full h-full flex flex-col bg-transparent border border-[var(--color-white-20)] p-4 md:p-6 relative z-[var(--z-content)] rounded-none overflow-hidden">
        
        {/* Centered Top Header Menu */}
        <div className="relative z-20">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Central main workspace with scrollable content */}
        <main className="flex-grow flex flex-col w-full justify-start items-center relative z-10 overflow-y-auto overflow-x-hidden py-2 gap-4 pr-1">
          {children}
        </main>

        {/* Symmetrically aligned Footer */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};
