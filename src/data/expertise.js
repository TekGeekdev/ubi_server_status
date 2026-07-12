// Coûts d'amélioration d'expertise par niveau (relevé communautaire
// juillet 2026, cap 30). Chaque colonne est validée par la ligne TOTAL de la
// matrice source : armes 610/1030/1754, équipement 305/535/875, compétences
// 770/1300/2200 ; spéciales 76/166/45 (armes, équipement) et 90/204/45
// (compétences).
// Matériaux de base jusqu'au niveau 10 ; données de reconnaissance à partir
// du niveau 8 ; calibrage SHD dès le 13 ; composants exotiques dès le 14.
export const EXPERTISE_MAX_LEVEL = 30;

export const ITEM_TYPES = ['weapon', 'gear', 'skill'];

// Ordre d'affichage des matériaux
export const MATERIALS = [
  'steel',
  'titanium',
  'receiverComponents',
  'polycarbonate',
  'carbonFiber',
  'protectiveFabric',
  'ceramic',
  'electronics',
  'printerFilament',
  'shdCalibration',
  'fieldReconData',
  'exoticComponents',
];

// Niveaux 11 à 30 : identiques pour armes et équipement
const WEAPON_GEAR_HIGH = [
  /* 11 */ { fieldReconData: 3 },
  /* 12 */ { fieldReconData: 4 },
  /* 13 */ { shdCalibration: 1, fieldReconData: 4 },
  /* 14 */ { shdCalibration: 1, fieldReconData: 5, exoticComponents: 1 },
  /* 15 */ { shdCalibration: 2, fieldReconData: 5, exoticComponents: 1 },
  /* 16 */ { shdCalibration: 2, fieldReconData: 6, exoticComponents: 1 },
  /* 17 */ { shdCalibration: 2, fieldReconData: 6, exoticComponents: 1 },
  /* 18 */ { shdCalibration: 3, fieldReconData: 7, exoticComponents: 2 },
  /* 19 */ { shdCalibration: 3, fieldReconData: 7, exoticComponents: 2 },
  /* 20 */ { shdCalibration: 4, fieldReconData: 8, exoticComponents: 2 },
  /* 21 */ { shdCalibration: 4, fieldReconData: 8, exoticComponents: 2 },
  /* 22 */ { shdCalibration: 4, fieldReconData: 9, exoticComponents: 3 },
  /* 23 */ { shdCalibration: 5, fieldReconData: 9, exoticComponents: 3 },
  /* 24 */ { shdCalibration: 5, fieldReconData: 10, exoticComponents: 3 },
  /* 25 */ { shdCalibration: 6, fieldReconData: 10, exoticComponents: 3 },
  /* 26 */ { shdCalibration: 6, fieldReconData: 11, exoticComponents: 4 },
  /* 27 */ { shdCalibration: 6, fieldReconData: 11, exoticComponents: 4 },
  /* 28 */ { shdCalibration: 7, fieldReconData: 12, exoticComponents: 4 },
  /* 29 */ { shdCalibration: 7, fieldReconData: 12, exoticComponents: 4 },
  /* 30 */ { shdCalibration: 8, fieldReconData: 13, exoticComponents: 5 },
];

// Niveaux 11 à 30 des compétences : calibrage et reconnaissance plus chers
// que armes/équipement, exotiques identiques
const SKILL_HIGH = [
  /* 11 */ { fieldReconData: 3 },
  /* 12 */ { fieldReconData: 4 },
  /* 13 */ { shdCalibration: 1, fieldReconData: 5 },
  /* 14 */ { shdCalibration: 1, fieldReconData: 5, exoticComponents: 1 },
  /* 15 */ { shdCalibration: 2, fieldReconData: 6, exoticComponents: 1 },
  /* 16 */ { shdCalibration: 2, fieldReconData: 7, exoticComponents: 1 },
  /* 17 */ { shdCalibration: 3, fieldReconData: 7, exoticComponents: 1 },
  /* 18 */ { shdCalibration: 3, fieldReconData: 8, exoticComponents: 2 },
  /* 19 */ { shdCalibration: 4, fieldReconData: 9, exoticComponents: 2 },
  /* 20 */ { shdCalibration: 4, fieldReconData: 10, exoticComponents: 2 },
  /* 21 */ { shdCalibration: 5, fieldReconData: 10, exoticComponents: 2 },
  /* 22 */ { shdCalibration: 5, fieldReconData: 11, exoticComponents: 3 },
  /* 23 */ { shdCalibration: 6, fieldReconData: 12, exoticComponents: 3 },
  /* 24 */ { shdCalibration: 6, fieldReconData: 12, exoticComponents: 3 },
  /* 25 */ { shdCalibration: 7, fieldReconData: 13, exoticComponents: 3 },
  /* 26 */ { shdCalibration: 7, fieldReconData: 14, exoticComponents: 4 },
  /* 27 */ { shdCalibration: 8, fieldReconData: 14, exoticComponents: 4 },
  /* 28 */ { shdCalibration: 8, fieldReconData: 15, exoticComponents: 4 },
  /* 29 */ { shdCalibration: 9, fieldReconData: 16, exoticComponents: 4 },
  /* 30 */ { shdCalibration: 9, fieldReconData: 17, exoticComponents: 5 },
];

// COSTS[type][niveau - 1] = coût pour atteindre ce niveau depuis le précédent
export const COSTS = {
  weapon: [
    { steel: 38, titanium: 45, receiverComponents: 76 },
    { steel: 68, titanium: 52, receiverComponents: 90 },
    { steel: 110, titanium: 61, receiverComponents: 106 },
    { steel: 164, titanium: 72, receiverComponents: 125 },
    { steel: 230, titanium: 85, receiverComponents: 147 },
    { titanium: 105, receiverComponents: 162 },
    { titanium: 122, receiverComponents: 198 },
    { titanium: 141, receiverComponents: 238, fieldReconData: 1 },
    { titanium: 162, receiverComponents: 282, fieldReconData: 2 },
    { titanium: 185, receiverComponents: 330, fieldReconData: 3 },
    ...WEAPON_GEAR_HIGH,
  ],
  gear: [
    { polycarbonate: 47, carbonFiber: 35, protectiveFabric: 49 },
    { polycarbonate: 54, carbonFiber: 38, protectiveFabric: 58 },
    { polycarbonate: 61, carbonFiber: 41, protectiveFabric: 67 },
    { polycarbonate: 68, carbonFiber: 44, protectiveFabric: 76 },
    { polycarbonate: 75, carbonFiber: 47, protectiveFabric: 85 },
    { carbonFiber: 58, protectiveFabric: 92 },
    { carbonFiber: 62, protectiveFabric: 100 },
    { carbonFiber: 66, protectiveFabric: 108, fieldReconData: 1 },
    { carbonFiber: 70, protectiveFabric: 116, fieldReconData: 2 },
    { carbonFiber: 74, protectiveFabric: 124, fieldReconData: 3 },
    ...WEAPON_GEAR_HIGH,
  ],
  skill: [
    { ceramic: 122, electronics: 76, printerFilament: 130 },
    { ceramic: 138, electronics: 88, printerFilament: 150 },
    { ceramic: 154, electronics: 100, printerFilament: 170 },
    { ceramic: 170, electronics: 112, printerFilament: 190 },
    { ceramic: 186, electronics: 124, printerFilament: 210 },
    { electronics: 136, printerFilament: 230 },
    { electronics: 148, printerFilament: 250 },
    { electronics: 160, printerFilament: 270, fieldReconData: 1 },
    { electronics: 172, printerFilament: 290, fieldReconData: 2 },
    { electronics: 184, printerFilament: 310, fieldReconData: 3 },
    ...SKILL_HIGH,
  ],
};
