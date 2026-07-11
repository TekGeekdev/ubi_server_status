// Données de jeu figées au 09.07.2026 (patch augments 2.1).
// Les noms sont des termes du jeu, non traduits ; les descriptions d'effets
// sont dans l'i18n sous les clés `augments.effect.<nom en minuscules>`.
export const MAX_LEVEL = 10;
export const MAX_PIECES = 7;

export const AUGMENTS = [
  {
    name: 'Amalgam',
    gain: '+0,3%',
    values: ['1,6%', '1,9%', '2,2%', '2,5%', '2,8%', '3,1%', '3,4%', '3,7%', '4,0%', '4,3%'],
  },
  {
    name: 'Anomaly',
    gain: '+0,5%',
    values: ['4,0%', '4,5%', '5,0%', '5,5%', '6,0%', '6,5%', '7,0%', '7,5%', '8,0%', '8,5%'],
  },
  {
    name: 'Atomize',
    gain: '+1%',
    values: ['12,5%', '13,5%', '14,5%', '15,5%', '16,5%', '17,5%', '18,5%', '19,5%', '20,5%', '21,5%'],
  },
  {
    name: 'Echo',
    gain: '+0,2%',
    values: ['1,2%', '1,4%', '1,6%', '1,8%', '2,0%', '2,2%', '2,4%', '2,6%', '2,8%', '3,0%'],
  },
  {
    name: 'Entropy',
    gain: '+1%',
    values: ['5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%'],
  },
  {
    name: 'Paradox',
    gain: '+0,5%',
    values: ['1,5%', '2,0%', '2,5%', '3,0%', '3,5%', '4,0%', '4,5%', '5,0%', '5,5%', '6,0%'],
  },
  {
    name: 'Quantum',
    gain: '+0,3%',
    values: ['1,6%', '1,9%', '2,2%', '2,5%', '2,8%', '3,1%', '3,4%', '3,7%', '4,0%', '4,3%'],
  },
  {
    name: 'Synesthesia',
    gain: '+1%',
    values: ['5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%'],
  },
  {
    name: 'Trapper',
    gain: '+1%',
    values: ['5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%'],
  },
];
