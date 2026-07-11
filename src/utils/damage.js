// Formules communautaires de The Division 2 : les bonus d'un même groupe
// s'additionnent, les groupes se multiplient entre eux.
// Groupes : dégâts d'arme | critique + pleine tête | armure | hors couverture | multiplicatifs.
// Tous les pourcentages sont exprimés en fractions (0.6 pour 60 %).

export const CHC_CAP = 0.6;

export function weaponShotDamage({ base, wd, chd, hsd, dta, toc, amp }, { crit = false, headshot = false } = {}) {
  const critBucket = 1 + (crit ? chd : 0) + (headshot ? hsd : 0);
  return base * (1 + wd) * critBucket * (1 + dta) * (1 + toc) * (1 + amp);
}

// Le groupe critique/tête étant linéaire (1 + crit·CHD + tête·HSD),
// l'espérance s'obtient en remplaçant les indicatrices par leurs probabilités.
export function expectedBulletDamage(stats, { chc, hsRate = 0 }) {
  const cappedChc = Math.min(chc, CHC_CAP);
  const expectedBucket = 1 + cappedChc * stats.chd + hsRate * stats.hsd;
  return (
    stats.base * (1 + stats.wd) * expectedBucket * (1 + stats.dta) * (1 + stats.toc) * (1 + stats.amp)
  );
}

export function burstDps(bulletDamage, rpm) {
  return bulletDamage * (rpm / 60);
}

export function sustainedDps(bulletDamage, { rpm, mag, reload }) {
  if (rpm <= 0 || mag <= 0) return 0;
  const emptyTime = mag / (rpm / 60);
  return (bulletDamage * mag) / (emptyTime + reload);
}

export function skillDamage({ base, sd, amp }) {
  return base * (1 + sd) * (1 + amp);
}

// L'attribut « Effets d'état » augmente les dégâts ET la durée des effets dommageables.
export function statusEffectDamage({ tick, interval, duration, bonus }) {
  const tickDamage = tick * (1 + bonus);
  const effectiveDuration = duration * (1 + bonus);
  const ticks =
    interval > 0 && effectiveDuration > 0
      ? Math.max(1, Math.floor(effectiveDuration / interval))
      : 0;
  const total = tickDamage * ticks;
  return {
    tickDamage,
    duration: effectiveDuration,
    ticks,
    total,
    dps: effectiveDuration > 0 ? total / effectiveDuration : 0,
  };
}
