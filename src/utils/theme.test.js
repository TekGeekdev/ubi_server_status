import { describe, expect, it } from 'vitest';
import { resolveInitialTheme } from './theme';

describe('resolveInitialTheme', () => {
  it('respecte le choix sauvegardé', () => {
    expect(resolveInitialTheme('light', false)).toBe('light');
    expect(resolveInitialTheme('dark', true)).toBe('dark');
  });

  it('suit la préférence système sans choix sauvegardé', () => {
    expect(resolveInitialTheme(null, true)).toBe('light');
    expect(resolveInitialTheme(null, false)).toBe('dark');
  });

  it('ignore une valeur sauvegardée invalide', () => {
    expect(resolveInitialTheme('néon', true)).toBe('light');
    expect(resolveInitialTheme('', false)).toBe('dark');
  });
});
