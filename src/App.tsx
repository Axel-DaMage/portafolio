import { useState } from 'react';
import { TerminalLayout, SectionBlock, VimBlock } from './components/layout';
import { Hero, Dashboard, Projects, About, Telemetry, Contact } from './components/sections';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(0);

  const scrollToSection = (tabId: string) => {
    const el = document.getElementById(`section-${tabId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(tabId);
    }
  };

  return (
    <TerminalLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeBlockIndex={activeBlockIndex}
      setActiveBlockIndex={setActiveBlockIndex}
    >
      {/* 01: Dashboard & Intro */}
      <SectionBlock
        id="dashboard"
        index="1"
        fileName="01_dashboard.lua"
        startLine={1}
        lineCount={25}
        isActive={activeTab === 'dashboard'}
      >
        <div className="flex flex-col gap-2 w-full text-left">
          <VimBlock
            id="block-intro"
            blockIndex={0}
            activeBlockIndex={activeBlockIndex}
            onSelectBlock={setActiveBlockIndex}
            title="Biografía"
          >
            <Hero />
          </VimBlock>

          <VimBlock
            id="block-overview"
            blockIndex={1}
            activeBlockIndex={activeBlockIndex}
            onSelectBlock={setActiveBlockIndex}
            title="Resumen"
          >
            <Dashboard setActiveTab={scrollToSection} />
          </VimBlock>
        </div>
      </SectionBlock>

      {/* 02: Projects */}
      <SectionBlock
        id="projects"
        index="2"
        fileName="02_projects.tsx"
        startLine={26}
        lineCount={30}
        isActive={activeTab === 'projects'}
      >
        <VimBlock
          id="block-projects"
          blockIndex={2}
          activeBlockIndex={activeBlockIndex}
          onSelectBlock={setActiveBlockIndex}
          title="Proyectos"
        >
          <Projects />
        </VimBlock>
      </SectionBlock>

      {/* 03: Skills */}
      <SectionBlock
        id="skills"
        index="3"
        fileName="03_skills.json"
        startLine={56}
        lineCount={30}
        isActive={activeTab === 'skills'}
      >
        <VimBlock
          id="block-skills"
          blockIndex={3}
          activeBlockIndex={activeBlockIndex}
          onSelectBlock={setActiveBlockIndex}
          title="Habilidades"
        >
          <About />
        </VimBlock>
      </SectionBlock>

      {/* 04: Telemetry */}
      <SectionBlock
        id="telemetry"
        index="4"
        fileName="04_telemetry.log"
        startLine={86}
        lineCount={35}
        isActive={activeTab === 'telemetry'}
      >
        <VimBlock
          id="block-telemetry"
          blockIndex={4}
          activeBlockIndex={activeBlockIndex}
          onSelectBlock={setActiveBlockIndex}
          title="Telemetría"
        >
          <Telemetry />
        </VimBlock>
      </SectionBlock>

      {/* 05: Contact */}
      <SectionBlock
        id="contact"
        index="5"
        fileName="05_contact.sh"
        startLine={121}
        lineCount={30}
        isActive={activeTab === 'contact'}
      >
        <VimBlock
          id="block-contact"
          blockIndex={5}
          activeBlockIndex={activeBlockIndex}
          onSelectBlock={setActiveBlockIndex}
          title="Contacto"
        >
          <Contact />
        </VimBlock>
      </SectionBlock>
    </TerminalLayout>
  );
}

export default App;
