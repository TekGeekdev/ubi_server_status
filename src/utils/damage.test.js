import { describe, it, expect } from 'vitest';
import {
  CHC_CAP,
  weaponShotDamage,
  expectedBulletDamage,
  burstDps,
  sustainedDps,
  skillDamage,
  statusEffectDamage,
} from './damage';

const stats = { base: 100, wd: 0.5, chd: 1.0, hsd: 0.5, dta: 0.1, toc: 0.1, amp: 0.2 };

describe('weaponShotDamage', () => {
  it('applique les groupes multiplicatifs sur un tir au corps', () => {
    // 100 × 1.5 × 1 × 1.1 × 1.1 × 1.2 = 217.8
    expect(weaponShotDamage(stats)).toBeCloseTo(217.8);
  });

  it('additionne critique et pleine tête dans le même groupe', () => {
    // groupe crit/tête : 1 + 1.0 + 0.5 = 2.5
    expect(weaponShotDamage(stats, { crit: true, headshot: true })).toBeCloseTo(217.8 * 2.5);
  });

  it('applique le critique seul', () => {
    expect(weaponShotDamage(stats, { crit: true })).toBeCloseTo(217.8 * 2);
  });
});

describe('expectedBulletDamage', () => {
  it('pondère critique et tête par leurs probabilités', () => {
    // groupe attendu : 1 + 0.5×1.0 + 0.4×0.5 = 1.7
    expect(expectedBulletDamage(stats, { chc: 0.5, hsRate: 0.4 })).toBeCloseTo(217.8 * 1.7);
  });

  it('plafonne la chance de critique à 60 %', () => {
    const atCap = expectedBulletDamage(stats, { chc: CHC_CAP });
    expect(expectedBulletDamage(stats, { chc: 0.9 })).toBeCloseTo(atCap);
  });
});

describe('DPS', () => {
  it('calcule le DPS en rafale à partir de la cadence', () => {
    expect(burstDps(1000, 600)).toBe(10000);
  });

  it('inclut la recharge dans le DPS soutenu', () => {
    // 30 balles à 600 RPM = 3 s de tir + 2 s de recharge → 30000 / 5
    expect(sustainedDps(1000, { rpm: 600, mag: 30, reload: 2 })).toBe(6000);
  });

  it('le DPS soutenu est toujours inférieur au DPS rafale', () => {
    expect(sustainedDps(1000, { rpm: 600, mag: 30, reload: 2 })).toBeLessThan(burstDps(1000, 600));
  });

  it('renvoie 0 quand la cadence ou le chargeur est à zéro', () => {
    expect(sustainedDps(1000, { rpm: 0, mag: 30, reload: 2 })).toBe(0);
    expect(sustainedDps(1000, { rpm: 600, mag: 0, reload: 2 })).toBe(0);
  });
});

describe('skillDamage', () => {
  it('multiplie base, dégâts de compétences et bonus', () => {
    expect(skillDamage({ base: 100000, sd: 0.3, amp: 0.1 })).toBeCloseTo(143000);
  });
});

describe('statusEffectDamage', () => {
  it('augmente dégâts et durée avec le même bonus', () => {
    const r = statusEffectDamage({ tick: 100, interval: 1, duration: 10, bonus: 0.5 });
    expect(r.tickDamage).toBe(150);
    expect(r.duration).toBe(15);
    expect(r.ticks).toBe(15);
    expect(r.total).toBe(2250);
    expect(r.dps).toBe(150);
  });

  it('garantit au moins un tick pour un effet actif', () => {
    const r = statusEffectDamage({ tick: 100, interval: 5, duration: 3, bonus: 0 });
    expect(r.ticks).toBe(1);
  });

  it('gère un intervalle nul sans diviser par zéro', () => {
    const r = statusEffectDamage({ tick: 100, interval: 0, duration: 5, bonus: 0 });
    expect(r.ticks).toBe(0);
    expect(r.total).toBe(0);
  });

  it('ne produit aucun tick pour une durée nulle', () => {
    const r = statusEffectDamage({ tick: 100, interval: 1, duration: 0, bonus: 0 });
    expect(r.ticks).toBe(0);
    expect(r.total).toBe(0);
    expect(r.dps).toBe(0);
  });
});
