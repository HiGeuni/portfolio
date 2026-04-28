/** Convert 0-100 percentage to 2-char hex alpha (e.g. 10 → "1a") */
export function hexAlpha(percentage: number): string {
  const v = Math.max(0, Math.min(255, Math.round((percentage / 100) * 255)));
  return v.toString(16).padStart(2, '0');
}

/** Returns ink for light backgrounds, paper for dark */
export function pickReadableInk(bg: string, ink: string, paper: string): string {
  const c = bg.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? ink : paper;
}
