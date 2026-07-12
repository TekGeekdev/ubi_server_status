// Coûts d'amélioration d'expertise par niveau, matrice patch Y7S1 (relevé
// communautaire Reddit, cap 30).
// Matériaux de base jusqu'au niveau 10 ; données de reconnaissance à partir
// du niveau 8 ; calibrage SHD et composants exotiques à partir du niveau 13.
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

// Niveaux 11 à 30, identiques pour les trois types d'objets
const HIGH_LEVELS = [
  /* 11 */ { fieldReconData: 3 },
  /* 12 */ { fieldReconData: 4 },
  /* 13 */ { shdCalibration: 1, fieldReconData: 5, exoticComponents: 1 },
  /* 14 */ { shdCalibration: 1, fieldReconData: 5, exoticComponents: 1 },
  /* 15 */ { shdCalibration: 2, fieldReconData: 6, exoticComponents: 2 },
  /* 16 */ { shdCalibration: 2, fieldReconData: 7, exoticComponents: 2 },
  /* 17 */ { shdCalibration: 3, fieldReconData: 7, exoticComponents: 3 },
  /* 18 */ { shdCalibration: 3, fieldReconData: 8, exoticComponents: 3 },
  /* 19 */ { shdCalibration: 4, fieldReconData: 9, exoticComponents: 4 },
  /* 20 */ { shdCalibration: 4, fieldReconData: 10, exoticComponents: 4 },
  /* 21 */ { shdCalibration: 5, fieldReconData: 10, exoticComponents: 5 },
  /* 22 */ { shdCalibration: 5, fieldReconData: 11, exoticComponents: 5 },
  /* 23 */ { shdCalibration: 6, fieldReconData: 12, exoticComponents: 6 },
  /* 24 */ { shdCalibration: 6, fieldReconData: 12, exoticComponents: 6 },
  /* 25 */ { shdCalibration: 7, fieldReconData: 13, exoticComponents: 7 },
  /* 26 */ { shdCalibration: 7, fieldReconData: 14, exoticComponents: 7 },
  /* 27 */ { shdCalibration: 8, fieldReconData: 14, exoticComponents: 8 },
  /* 28 */ { shdCalibration: 8, fieldReconData: 15, exoticComponents: 8 },
  /* 29 */ { shdCalibration: 9, fieldReconData: 16, exoticComponents: 9 },
  /* 30 */ { shdCalibration: 9, fieldReconData: 17, exoticComponents: 9 },
];

// COSTS[type][niveau - 1] = coût pour atteindre ce niveau depuis le précédent
export const COSTS = {
  weapon: [
    { steel: 122, titanium: 76, receiverComponents: 130 },
    { steel: 138, titanium: 88, receiverComponents: 150 },
    { steel: 154, titanium: 100, receiverComponents: 170 },
    { steel: 170, titanium: 112, receiverComponents: 190 },
    { steel: 186, titanium: 124, receiverComponents: 210 },
    { titanium: 136, receiverComponents: 230 },
    { titanium: 148, receiverComponents: 250 },
    { titanium: 160, receiverComponents: 270, fieldReconData: 1 },
    { titanium: 172, receiverComponents: 290, fieldReconData: 2 },
    { titanium: 184, receiverComponents: 310, fieldReconData: 3 },
    ...HIGH_LEVELS,
  ],
  gear: [
    { polycarbonate: 61, carbonFiber: 40, protectiveFabric: 65 },
    { polycarbonate: 69, carbonFiber: 46, protectiveFabric: 75 },
    { polycarbonate: 77, carbonFiber: 52, protectiveFabric: 85 },
    { polycarbonate: 85, carbonFiber: 58, protectiveFabric: 95 },
    { polycarbonate: 93, carbonFiber: 64, protectiveFabric: 105 },
    { carbonFiber: 70, protectiveFabric: 115 },
    { carbonFiber: 76, protectiveFabric: 125 },
    { carbonFiber: 82, protectiveFabric: 135, fieldReconData: 1 },
    { carbonFiber: 88, protectiveFabric: 145, fieldReconData: 2 },
    { carbonFiber: 94, protectiveFabric: 155, fieldReconData: 3 },
    ...HIGH_LEVELS,
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
    ...HIGH_LEVELS,
  ],
};
