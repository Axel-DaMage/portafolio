export type NavMode = 'vim' | 'normal';

export interface NavTab {
  id: string;
  num: string;
  fileName: string;
  fileType: string;
  startLine: number;
}

export const NAV_TABS: NavTab[] = [
  { id: 'dashboard', num: '1', fileName: '01_dashboard.lua', fileType: 'lua', startLine: 1 },
  { id: 'projects', num: '2', fileName: '02_projects.tsx', fileType: 'tsx', startLine: 26 },
  { id: 'skills', num: '3', fileName: '03_skills.json', fileType: 'json', startLine: 56 },
  { id: 'telemetry', num: '4', fileName: '04_telemetry.log', fileType: 'log', startLine: 86 },
  { id: 'contact', num: '5', fileName: '05_contact.sh', fileType: 'sh', startLine: 121 },
];

export interface VimBlockDef {
  id: string;
  name: string;
  sectionId: string;
  fileName: string;
  line: number;
}

export const VIM_BLOCKS: VimBlockDef[] = [
  { id: 'block-intro', name: 'biografía', sectionId: 'dashboard', fileName: '01_dashboard.lua', line: 1 },
  { id: 'block-overview', name: 'resumen', sectionId: 'dashboard', fileName: '01_dashboard.lua', line: 14 },
  { id: 'block-projects', name: 'proyectos', sectionId: 'projects', fileName: '02_projects.tsx', line: 26 },
  { id: 'block-skills', name: 'habilidades', sectionId: 'skills', fileName: '03_skills.json', line: 56 },
  { id: 'block-telemetry', name: 'telemetría', sectionId: 'telemetry', fileName: '04_telemetry.log', line: 86 },
  { id: 'block-contact', name: 'contacto', sectionId: 'contact', fileName: '05_contact.sh', line: 121 },
];
