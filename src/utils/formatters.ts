/**
 * Utilidades de formateo para el portafolio TUI
 */

/**
 * Calcula y formatea el tiempo transcurrido desde una fecha ISO hasta ahora
 * Ejemplo de salida: "hace 2m 34s", "hace 1h 12m 5s", "hace 3d 4h 10m 22s"
 */
export const formatElapsedTime = (targetDateString: string): string => {
  const now = new Date();
  const target = new Date(targetDateString);
  const diffMs = now.getTime() - target.getTime();

  if (isNaN(diffMs) || diffMs < 0) {
    return 'hace 0s';
  }

  const diffSecs = Math.floor(diffMs / 1000);
  const secs = diffSecs % 60;
  const diffMins = Math.floor(diffSecs / 60);
  const mins = diffMins % 60;
  const diffHrs = Math.floor(diffMins / 60);
  const hrs = diffHrs % 24;
  const days = Math.floor(diffHrs / 24);

  let parts = '';
  if (days > 0) parts += `${days}d `;
  if (hrs > 0 || days > 0) parts += `${hrs}h `;
  if (mins > 0 || hrs > 0 || days > 0) parts += `${mins}m `;
  parts += `${secs}s`;

  return `hace ${parts}`;
};

/**
 * Formatea una fecha a cadena ISO 24h legible estilo terminal
 * Ejemplo: "2026-09-18 21:30:00"
 */
export const formatTerminalTimestamp = (date: Date | string = new Date()): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toISOString().replace('T', ' ').substring(0, 19);
};
