import { COSTS, EXPERTISE_MAX_LEVEL } from '../data/expertise';

// Coût cumulé pour monter un objet de `from` à `to` (exclusif → inclusif).
// Renvoie un objet { matériau: quantité } sans entrée nulle.
export function costBetween(type, from, to) {
  const rows = COSTS[type];
  if (!rows) return {};

  const start = Math.max(0, from);
  const end = Math.min(to, EXPERTISE_MAX_LEVEL);
  const total = {};

  for (let level = start + 1; level <= end; level++) {
    const row = rows[level - 1];
    for (const [material, amount] of Object.entries(row)) {
      total[material] = (total[material] || 0) + amount;
    }
  }

  return total;
}

// Agrège le coût d'une liste d'objets [{ type, from, to }]
export function totalCost(items) {
  const total = {};
  for (const item of items) {
    const cost = costBetween(item.type, item.from, item.to);
    for (const [material, amount] of Object.entries(cost)) {
      total[material] = (total[material] || 0) + amount;
    }
  }
  return total;
}
