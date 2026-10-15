import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NAV_TABS, VIM_BLOCKS, type NavMode } from '../../types';
import { ModeModal } from '../ui/ModeModal';

interface TerminalLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeBlockIndex: number;
  setActiveBlockIndex: (index: number) => void;
}

export const TerminalLayout: React.FC<TerminalLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  activeBlockIndex,
  setActiveBlockIndex,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Navigation mode state (Vim vs Normal)
  const [navMode, setNavMode] = useState<NavMode>(() => {
    const saved = localStorage.getItem('portfolio_nav_mode');
    return saved === 'normal' ? 'normal' : 'vim';
  });

  // Modal appears automatically upon entering the web
  const [isModeModalOpen, setIsModeModalOpen] = useState<boolean>(true);

  const handleSelectMode = (mode: NavMode) => {
    setNavMode(mode);
    localStorage.setItem('portfolio_nav_mode', mode);
    setIsModeModalOpen(false);
  };

  // Jump to specific block
  const jumpToBlock = useCallback((index: number) => {
    if (index < 0 || index >= VIM_BLOCKS.length) return;
    const block = VIM_BLOCKS[index];
    const el = document.getElementById(block.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    setActiveBlockIndex(index);
    setActiveTab(block.sectionId);
  }, [setActiveBlockIndex, setActiveTab]);

  // Jump to section
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(sectionId);

      const blockIdx = VIM_BLOCKS.findIndex((b) => b.sectionId === sectionId);
      if (blockIdx !== -1) {
        setActiveBlockIndex(blockIdx);
      }
    }
  }, [setActiveBlockIndex, setActiveTab]);

  // Track scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const percent = maxScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100))) : 0;
    setScrollPercent(percent);

    const containerTop = scrollRef.current.getBoundingClientRect().top;
    let closestIndex = 0;
    let minDistance = Infinity;

    VIM_BLOCKS.forEach((block, idx) => {
      const el = document.getElementById(block.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - containerTop);
        if (dist < minDistance && rect.top <= containerTop + 200) {
          minDistance = dist;
          closestIndex = idx;
        }
      }
    });

    if (closestIndex !== activeBlockIndex) {
      setActiveBlockIndex(closestIndex);
      setActiveTab(VIM_BLOCKS[closestIndex].sectionId);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      // Toggle modal with 'm' or 'M'
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsModeModalOpen((prev) => !prev);
        return;
      }

      // If modal is open, ignore other navigation keys
      if (isModeModalOpen) return;

      // Quick tab numbers 1..5 in both modes
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (NAV_TABS[index]) {
          scrollToSection(NAV_TABS[index].id);
        }
        return;
      }

      // VIM Mode Controls
      if (navMode === 'vim') {
        if (e.key === 'j' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = Math.min(activeBlockIndex + 1, VIM_BLOCKS.length - 1);
          jumpToBlock(next);
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = Math.max(activeBlockIndex - 1, 0);
          jumpToBlock(prev);
        } else if (e.key === 'h' || e.key === 'ArrowLeft') {
          setIsSidebarOpen(true);
        } else if (e.key === 'l' || e.key === 'ArrowRight') {
          // Focus buffer
        } else if (e.key === 'g') {
          jumpToBlock(0);
        } else if (e.key === 'G') {
          jumpToBlock(VIM_BLOCKS.length - 1);
        } else if (e.key === 'b') {
          setIsSidebarOpen((prev) => !prev);
        }
      }

      // NORMAL Mode Controls
      if (navMode === 'normal') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = Math.min(activeBlockIndex + 1, VIM_BLOCKS.length - 1);
          jumpToBlock(next);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = Math.max(activeBlockIndex - 1, 0);
          jumpToBlock(prev);
        } else if (e.key === 'Enter') {
          jumpToBlock(activeBlockIndex);
        } else if (e.key === 'b') {
          setIsSidebarOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBlockIndex, isModeModalOpen, jumpToBlock, navMode, scrollToSection]);

  const currentBlock = VIM_BLOCKS[activeBlockIndex] || VIM_BLOCKS[0];

  return (
    <div className="crt-screen w-screen h-screen flex flex-col overflow-hidden relative bg-ctp-crust font-mono select-none text-left">
      <div className="scanlines" />
      <div className="crt-vignette" />

      {/* Mode Selection Modal (Appears upon entry or by pressing 'm') */}
      <ModeModal
        isOpen={isModeModalOpen}
        onSelectMode={handleSelectMode}
        currentMode={navMode}
      />

      {/* Master TUI Container Window */}
      <div className="w-full h-full p-2 md:p-3 flex flex-col relative z-10 box-sizing:border-box">
        <div className="w-full h-full flex flex-col bg-ctp-base border border-ctp-surface0 overflow-hidden">
          
          {/* Top Bufferline / Tabline (Clear, standard height and contrast) */}
          <div className="tui-bufferline flex items-center justify-between px-2.5 text-xs select-none overflow-x-auto">
            <div className="flex items-center gap-1.5 flex-nowrap h-full">
              <span className="px-2.5 py-1 bg-ctp-mauve text-ctp-crust font-bold text-xs tracking-wider mr-2">
                LAZYVIM
              </span>

              {NAV_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex items-center gap-2 px-3 h-full text-xs transition-colors border-r border-ctp-surface0 cursor-pointer ${
                      isActive
                        ? 'bg-ctp-surface0 text-ctp-mauve font-bold border-b-2 border-b-ctp-mauve'
                        : 'text-ctp-text hover:text-[var(--color-white)] hover:bg-ctp-surface0/50'
                    }`}
                  >
                    <span className={isActive ? 'text-ctp-teal font-bold text-xs' : 'text-ctp-overlay font-normal text-xs'}>
                      {tab.num}
                    </span>
                    <span>{tab.fileName}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3 text-xs text-ctp-subtext pr-2 h-full">
              <span className="text-ctp-teal font-medium">git:(main)</span>
              <span>•</span>
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="text-ctp-mauve hover:underline font-bold"
                title="Cambiar modo de navegación [m]"
              >
                [{navMode.toUpperCase()}]
              </button>
              <span>•</span>
              <span className="text-[var(--color-white)] font-semibold">axel@portafolio</span>
            </div>
          </div>

          {/* Body: Neo-tree Sidebar (Left) + Editor Buffer (Right) */}
          <div className="flex flex-row flex-grow w-full overflow-hidden relative text-left">
            
            {/* Neo-tree Sidebar: Files placed right at the top */}
            {isSidebarOpen && (
              <aside className="w-56 md:w-60 min-w-[14rem] md:min-w-[15rem] h-full border-r border-ctp-surface0 bg-ctp-mantle flex flex-col justify-between text-xs select-none overflow-y-auto text-left">
                {/* Top Section: Header & Files list directly at top */}
                <div className="flex flex-col w-full text-left">
                  {/* Header */}
                  <div className="p-2 border-b border-ctp-surface0 flex items-center justify-between text-[11px] text-ctp-subtext font-bold">
                    <span>NEO-TREE [proyecto]</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-[10px] text-ctp-overlay hover:text-ctp-subtext">[b:ocultar]</button>
                  </div>

                  {/* Files Tree right at top of sidebar */}
                  <div className="p-2 flex flex-col gap-1 font-mono text-left">
                    {/* Root directory */}
                    <div className="flex items-center gap-2 text-ctp-subtext py-0.5">
                      <span className="text-ctp-overlay w-4 text-right">1</span>
                      <span className="text-ctp-teal font-bold">▾</span>
                      <span className="text-[var(--color-white)] font-bold">portfolio/</span>
                    </div>

                    {/* Navigation files with line numbers 2..6 */}
                    {NAV_TABS.map((tab, idx) => {
                      const lineNum = idx + 2;
                      const isActive = activeTab === tab.id;
                      const isLast = idx === NAV_TABS.length - 1;
                      const branch = isLast ? '└──' : '├──';

                      return (
                        <button
                          key={tab.id}
                          onClick={() => scrollToSection(tab.id)}
                          className={`flex items-center gap-1.5 py-1 px-1 text-left w-full transition-colors rounded-none ${
                            isActive
                              ? 'bg-ctp-surface0 text-ctp-mauve font-bold'
                              : 'text-ctp-subtext hover:text-[var(--color-white)] hover:bg-ctp-surface0/40'
                          }`}
                        >
                          <span className={`w-4 text-right font-normal ${isActive ? 'text-ctp-teal font-bold' : 'text-ctp-overlay'}`}>
                            {lineNum}
                          </span>

                          <span className="text-ctp-overlay">{branch}</span>

                          <span className={`text-[10px] px-1 py-0.2 border border-ctp-surface1 ${
                            isActive ? 'text-ctp-mauve' : 'text-ctp-overlay'
                          }`}>
                            {tab.num}
                          </span>

                          <span className="truncate text-[11px]">{tab.fileName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Bottom Metadata & Links */}
                <div className="p-2 border-t border-ctp-surface0 text-[10px] text-ctp-subtext space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span>RAMA:</span>
                    <span className="text-ctp-teal font-bold">main [clean]</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MODO:</span>
                    <button
                      onClick={() => setIsModeModalOpen(true)}
                      className="text-ctp-mauve font-bold hover:underline"
                    >
                      {navMode === 'vim' ? 'VIM' : 'NORMAL'} [m]
                    </button>
                  </div>
                  <div className="pt-1.5 border-t border-ctp-surface0 flex justify-around text-center text-[10px]">
                    <a
                      href="https://github.com/Axel-DaMage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-blue hover:underline"
                    >
                      [github]
                    </a>
                    <a
                      href="https://github.com/Axel-DaMage/portafolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-mauve hover:underline"
                    >
                      [código]
                    </a>
                    <a
                      href="https://github.com/Axel-DaMage/portafolio/issues/2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-teal hover:underline"
                      title="Issue #2: Paletas de color"
                    >
                      [#2:tema]
                    </a>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Worktree / Editor Buffer (Aligned to top, not centered) */}
            <main
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 h-full overflow-y-auto overflow-x-hidden p-3 md:p-5 select-text scroll-smooth text-left flex flex-col items-start justify-start"
            >
              <div className="w-full max-w-5xl flex flex-col items-start justify-start text-left">
                {children}
              </div>
            </main>
          </div>

          {/* Bottom Statusline (Lualine style: Standard 32px height, clear visibility) */}
          <div className="tui-statusline flex items-center justify-between text-xs select-none text-left">
            {/* Left: Mode + File */}
            <div className="flex items-center h-full">
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="px-3.5 h-full flex items-center bg-ctp-mauve text-ctp-crust font-bold text-xs tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                title="Clic para cambiar modo de navegación [m]"
              >
                {navMode === 'vim' ? 'MODO-VIM' : 'MODO-NORMAL'}
              </button>
              <span className="px-3 h-full flex items-center bg-ctp-surface0 text-ctp-text text-xs font-semibold border-r border-ctp-surface1">
                portfolio.tsx [RO]
              </span>
              <span className="hidden sm:flex items-center h-full px-3 text-ctp-teal text-xs font-medium">
                {currentBlock.fileName} » {currentBlock.name}
              </span>
            </div>

            {/* Center: System Status */}
            <div className="hidden lg:flex items-center gap-2.5 text-xs text-ctp-subtext">
              <span>utf-8</span>
              <span>│</span>
              <span>Catppuccin Mocha</span>
              <span>│</span>
              <span className="text-ctp-teal font-medium">BLOQUE {activeBlockIndex + 1}/{VIM_BLOCKS.length}</span>
            </div>

            {/* Right: Position & Scroll % */}
            <div className="flex items-center h-full">
              <span className="px-3 h-full flex items-center bg-ctp-surface0 text-ctp-text text-xs font-mono border-l border-ctp-surface1">
                Ln {currentBlock.line}, Col 1
              </span>
              <span className="px-3.5 h-full flex items-center bg-ctp-mauve text-ctp-crust font-bold text-xs">
                {scrollPercent}%
              </span>
            </div>
          </div>

          {/* Very Bottom Command / Which-Key Bar (Standard 28px height, clear text) */}
          <div className="tui-commandline px-3 flex items-center justify-between text-xs text-ctp-subtext select-none text-left">
            {navMode === 'vim' ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-ctp-mauve font-bold">:ayuda</span>
                <span>│</span>
                <span className="text-ctp-text">[j/k] mover bloque</span>
                <span>│</span>
                <span className="text-ctp-text">[h/l] árbol / buffer</span>
                <span>│</span>
                <span className="text-ctp-text">[1..5] sección</span>
                <span>│</span>
                <span className="text-ctp-text">[g/G] inicio / fin</span>
                <span>│</span>
                <button
                  onClick={() => setIsModeModalOpen(true)}
                  className="text-ctp-teal font-bold hover:underline cursor-pointer"
                >
                  [m] cambiar modo
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-ctp-teal font-bold">:ayuda</span>
                <span>│</span>
                <span className="text-ctp-text">[↑ / ↓] mover bloque</span>
                <span>│</span>
                <span className="text-ctp-text">[Enter] enfocar</span>
                <span>│</span>
                <span className="text-ctp-text">[1..5] sección</span>
                <span>│</span>
                <button
                  onClick={() => setIsModeModalOpen(true)}
                  className="text-ctp-mauve font-bold hover:underline cursor-pointer"
                >
                  [m] cambiar modo
                </button>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <span className="text-ctp-teal font-bold">axel@portafolio:~$</span>
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="text-xs text-ctp-text font-semibold hover:text-ctp-mauve hover:underline cursor-pointer"
              >
                modo: {navMode}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
