import { describe, it, expect } from 'vitest';
import { costBetween, totalCost } from './expertise';
import { COSTS, EXPERTISE_MAX_LEVEL, ITEM_TYPES, MATERIALS } from '../data/expertise';

describe('costBetween', () => {
  it('calcule le coût du niveau 0 au niveau 1 pour une arme', () => {
    expect(costBetween('weapon', 0, 1)).toEqual({
      steel: 38,
      titanium: 45,
      receiverComponents: 76,
    });
  });

  it('cumule les niveaux intermédiaires', () => {
    // Niveaux 1 et 2 : acier 38+68, titane 45+52, châssis 76+90
    expect(costBetween('weapon', 0, 2)).toEqual({
      steel: 106,
      titanium: 97,
      receiverComponents: 166,
    });
  });

  it('ne compte que la tranche demandée', () => {
    expect(costBetween('skill', 5, 6)).toEqual({
      electronics: 136,
      printerFilament: 230,
    });
  });

  it('renvoie un objet vide si la cible ne dépasse pas le niveau actuel', () => {
    expect(costBetween('gear', 10, 10)).toEqual({});
    expect(costBetween('gear', 12, 5)).toEqual({});
  });

  it('plafonne au niveau maximum', () => {
    expect(costBetween('weapon', 29, 99)).toEqual(costBetween('weapon', 29, EXPERTISE_MAX_LEVEL));
  });

  it('chaque type possède une table complète jusqu\'au niveau 30', () => {
    for (const type of ITEM_TYPES) {
      expect(COSTS[type]).toHaveLength(EXPERTISE_MAX_LEVEL);
    }
  });

  it('pas de calibrage SHD avant le 13 ni d\'exotiques avant le 14', () => {
    for (const type of ITEM_TYPES) {
      const cost = costBetween(type, 7, 13);
      expect(cost.exoticComponents).toBeUndefined();
      const before13 = costBetween(type, 7, 12);
      expect(before13.shdCalibration).toBeUndefined();
    }
  });

  it('respecte le dernier palier : armes/équipement 8-13-5, compétences 9-17-5', () => {
    expect(costBetween('gear', 29, 30)).toEqual({
      shdCalibration: 8,
      fieldReconData: 13,
      exoticComponents: 5,
    });
    expect(costBetween('skill', 29, 30)).toEqual({
      shdCalibration: 9,
      fieldReconData: 17,
      exoticComponents: 5,
    });
  });

  it('reproduit les totaux de la matrice source (ligne TOTAL)', () => {
    const EXPECTED_TOTALS = {
      weapon: { steel: 610, titanium: 1030, receiverComponents: 1754, shdCalibration: 76, fieldReconData: 166, exoticComponents: 45 },
      gear: { polycarbonate: 305, carbonFiber: 535, protectiveFabric: 875, shdCalibration: 76, fieldReconData: 166, exoticComponents: 45 },
      skill: { ceramic: 770, electronics: 1300, printerFilament: 2200, shdCalibration: 90, fieldReconData: 204, exoticComponents: 45 },
    };
    for (const type of ITEM_TYPES) {
      const full = costBetween(type, 0, EXPERTISE_MAX_LEVEL);
      for (const material of MATERIALS) {
        const expected = EXPECTED_TOTALS[type][material];
        if (expected !== undefined) {
          expect(full[material], `${type}.${material}`).toBe(expected);
        } else {
          expect(full[material], `${type}.${material}`).toBeUndefined();
        }
      }
    }
  });
});

describe('totalCost', () => {
  it('agrège plusieurs objets', () => {
    const solo = costBetween('weapon', 0, 1);
    const double = totalCost([
      { type: 'weapon', from: 0, to: 1 },
      { type: 'weapon', from: 0, to: 1 },
    ]);
    expect(double.steel).toBe(solo.steel * 2);
    expect(double.receiverComponents).toBe(solo.receiverComponents * 2);
  });

  it('mélange des types différents sans écraser les matériaux', () => {
    const mixed = totalCost([
      { type: 'weapon', from: 0, to: 1 },
      { type: 'skill', from: 0, to: 1 },
    ]);
    expect(mixed.steel).toBe(38);
    expect(mixed.ceramic).toBe(122);
    expect(mixed.printerFilament).toBe(130);
  });

  it('renvoie un objet vide sans objets', () => {
    expect(totalCost([])).toEqual({});
  });
});
