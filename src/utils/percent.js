// Les valeurs du jeu sont stockées au format français ("4,3%") : on convertit
// la virgule en point pour calculer, puis on la restitue à l'affichage.
export function parsePercent(str) {
  return parseFloat(str.replace('%', '').replace(',', '.'));
}

export function formatPercent(num) {
  const rounded = Math.round(num * 10) / 10;
  const str = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(1).replace('.', ',');
  return `${str}%`;
}
