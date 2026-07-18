export const THEMES = ['dark', 'light'];

export const THEME_STORAGE_KEY = 'div2-theme';

// Priorité : choix sauvegardé s'il est valide, sinon préférence système,
// sinon mode sombre (thème historique du site)
export function resolveInitialTheme(stored, prefersLight) {
  if (THEMES.includes(stored)) return stored;
  return prefersLight ? 'light' : 'dark';
}
