import { describe, it, expect } from 'vitest';
import { parsePercent, formatPercent } from './percent';

describe('parsePercent', () => {
  it('convertit un pourcentage au format français en nombre', () => {
    expect(parsePercent('4,3%')).toBe(4.3);
  });

  it('gère les valeurs entières', () => {
    expect(parsePercent('14%')).toBe(14);
  });
});

describe('formatPercent', () => {
  it('formate un entier sans décimale', () => {
    expect(formatPercent(14)).toBe('14%');
  });

  it('formate une décimale avec une virgule', () => {
    expect(formatPercent(4.3)).toBe('4,3%');
  });

  it('arrondit à une décimale', () => {
    expect(formatPercent(12.899999)).toBe('12,9%');
  });

  it('reste stable en aller-retour parse/format', () => {
    expect(formatPercent(parsePercent('8,5%'))).toBe('8,5%');
  });
});
