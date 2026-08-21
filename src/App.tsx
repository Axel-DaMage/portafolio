import { useState } from 'react';
import { TerminalLayout } from './components/layout/TerminalLayout';
import { Dashboard } from './components/sections/Dashboard';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <TerminalLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </TerminalLayout>
  );
}

export default App;
