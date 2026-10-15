import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NAV_TABS, VIM_BLOCKS, type NavMode } from '../../types';
import { ModeModal } from '../ui/ModeModal';
import { CommandLine } from '../ui/CommandLine';

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
  const scrollRafRef = useRef<number | null>(null);
  const activeBlockIndexRef = useRef<number>(activeBlockIndex);
  useEffect(() => {
    activeBlockIndexRef.current = activeBlockIndex;
  }, [activeBlockIndex]);

  // Command line (':') state
  const [isCmdLineOpen, setIsCmdLineOpen] = useState<boolean>(false);
  const [cmdError, setCmdError] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const cmdErrorTimerRef = useRef<number | null>(null);

  // Navigation mode state (Vim vs Normal)
  const [navMode, setNavMode] = useState<NavMode>(() => {
    const saved = localStorage.getItem('portfolio_nav_mode');
    return saved === 'normal' ? 'normal' : 'vim';
  });

  // Modal opens only on first visit (no persisted nav mode); 'm' reopens it
  const [isModeModalOpen, setIsModeModalOpen] = useState<boolean>(
    () => localStorage.getItem('portfolio_nav_mode') === null
  );

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

  // --- Commandline (':') helpers ---

  const showCmdError = useCallback((msg: string) => {
    setCmdError(msg);
    if (cmdErrorTimerRef.current !== null) {
      window.clearTimeout(cmdErrorTimerRef.current);
    }
    cmdErrorTimerRef.current = window.setTimeout(() => {
      setCmdError(null);
      cmdErrorTimerRef.current = null;
    }, 4000);
  }, []);

  // Vim-style ex-command parser
  const executeCommand = useCallback((raw: string) => {
    const input = raw.trim().replace(/^:+/, '').toLowerCase();
    setIsCmdLineOpen(false);
    if (!input) return;

    if (input === 'ayuda' || input === 'help') {
      setIsHelpOpen(true);
      return;
    }

    // :<1-5> jumps straight to a section
    if (/^[1-5]$/.test(input)) {
      const tab = NAV_TABS[parseInt(input, 10) - 1];
      if (tab) scrollToSection(tab.id);
      return;
    }

    const [head, ...args] = input.split(/\s+/);
    const arg = args.join(' ');

    if (head === 'e' || head === 'edit') {
      if (!arg) {
        showCmdError('E471: argumento requerido (uso: :e <seccion|archivo>)');
        return;
      }
      const numeric = parseInt(arg, 10);
      const tab =
        Number.isInteger(numeric) && numeric >= 1 && numeric <= NAV_TABS.length
          ? NAV_TABS[numeric - 1]
          : NAV_TABS.find((t) => t.id === arg || t.fileName.includes(arg));
      if (tab) {
        scrollToSection(tab.id);
      } else {
        showCmdError(`E447: no se encuentra "${arg}" en el path`);
      }
      return;
    }

    if (head === 'set') {
      if (args[0] === 'mode' && (args[1] === 'vim' || args[1] === 'normal')) {
        setNavMode(args[1] as NavMode);
        localStorage.setItem('portfolio_nav_mode', args[1]);
      } else {
        showCmdError('E518: opción desconocida (uso: :set mode vim|normal)');
      }
      return;
    }

    if (head === 'q' || head === 'q!' || head === 'quit' || head === 'wq') {
      showCmdError('E162: no se puede salir de un portafolio');
      return;
    }

    showCmdError(`E492: Not an editor command: ${input}`);
  }, [scrollToSection, showCmdError]);

  // rAF-throttled scroll percent — no per-block layout reads
  const handleScroll = () => {
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const el = scrollRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      const percent = maxScroll > 0
        ? Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)))
        : 0;
      setScrollPercent(percent);
    });
  };

  // IntersectionObserver: single source of truth for the active block.
  // Tracks which VIM_BLOCKS element is the topmost one intersecting the
  // scrolling <main> container — no layout reads on scroll events.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    // block index -> boundingClientRect.top of its last reported entry
    const visible = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = VIM_BLOCKS.findIndex((b) => b.id === entry.target.id);
          if (idx === -1) continue;
          if (entry.isIntersecting) {
            visible.set(idx, entry.boundingClientRect.top);
          } else {
            visible.delete(idx);
          }
        }

        let topIdx = -1;

        // Bottom edge: last block wins when scrolled to the end
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) {
          topIdx = VIM_BLOCKS.length - 1;
        } else {
          let topY = Infinity;
          visible.forEach((top, idx) => {
            if (top < topY) {
              topY = top;
              topIdx = idx;
            }
          });
        }

        if (topIdx !== -1 && topIdx !== activeBlockIndexRef.current) {
          setActiveBlockIndex(topIdx);
          setActiveTab(VIM_BLOCKS[topIdx].sectionId);
        }
      },
      // Spy band: top ~30% of the buffer — the topmost visible block wins
      { root, rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    // Blocks render as children; retry briefly in case they mount late
    const observed = new Set<string>();
    let retryTimer: number | null = null;
    let attempts = 0;
    const tryObserve = () => {
      for (const block of VIM_BLOCKS) {
        if (observed.has(block.id)) continue;
        const el = document.getElementById(block.id);
        if (el) {
          observer.observe(el);
          observed.add(block.id);
        }
      }
      if (observed.size < VIM_BLOCKS.length && ++attempts < 20) {
        retryTimer = window.setTimeout(tryObserve, 100);
      }
    };
    tryObserve();

    return () => {
      observer.disconnect();
      if (retryTimer !== null) window.clearTimeout(retryTimer);
    };
  }, [setActiveBlockIndex, setActiveTab]);

  // Cleanup pending timers / animation frames on unmount
  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
      if (cmdErrorTimerRef.current !== null) {
        window.clearTimeout(cmdErrorTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Toggle modal with 'm' or 'M'
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsModeModalOpen((prev) => !prev);
        return;
      }

      // If modal is open, ignore other navigation keys
      if (isModeModalOpen) return;

      // Help panel open: Esc/Enter dismiss, ':' jumps into the command line
      if (isHelpOpen) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          e.preventDefault();
          setIsHelpOpen(false);
        } else if (e.key === ':') {
          e.preventDefault();
          setIsHelpOpen(false);
          setIsCmdLineOpen(true);
        }
        return;
      }

      // Command line open but input not focused: Esc cancels
      if (isCmdLineOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsCmdLineOpen(false);
        }
        return;
      }

      // ':' opens the vim-style command line
      if (e.key === ':') {
        e.preventDefault();
        setIsCmdLineOpen(true);
        return;
      }

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
  }, [activeBlockIndex, isModeModalOpen, isHelpOpen, isCmdLineOpen, jumpToBlock, navMode, scrollToSection]);

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
      <div className="w-full h-full p-2 md:p-3 flex flex-col relative z-10">
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
          <CommandLine
            navMode={navMode}
            isOpen={isCmdLineOpen}
            error={cmdError}
            helpOpen={isHelpOpen}
            onCancel={() => setIsCmdLineOpen(false)}
            onExecute={executeCommand}
            onOpenModeModal={() => setIsModeModalOpen(true)}
          />

        </div>
      </div>
    </div>
  );
};
