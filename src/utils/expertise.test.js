import { describe, it, expect } from 'vitest';
import { costBetween, totalCost } from './expertise';
import { COSTS, EXPERTISE_MAX_LEVEL, ITEM_TYPES } from '../data/expertise';

describe('costBetween', () => {
  it('calcule le coût du niveau 0 au niveau 1 pour une arme', () => {
    expect(costBetween('weapon', 0, 1)).toEqual({
      steel: 122,
      titanium: 76,
      receiverComponents: 130,
    });
  });

  it('cumule les niveaux intermédiaires', () => {
    // Niveaux 1 et 2 : acier 122+138, titane 76+88, récepteur 130+150
    expect(costBetween('weapon', 0, 2)).toEqual({
      steel: 260,
      titanium: 164,
      receiverComponents: 280,
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

  it('respecte la matrice Y7S1 : pas de calibrage ni d\'exotiques avant le niveau 13', () => {
    for (const type of ITEM_TYPES) {
      const cost = costBetween(type, 7, 12);
      expect(cost.shdCalibration).toBeUndefined();
      expect(cost.exoticComponents).toBeUndefined();
      expect(cost.fieldReconData).toBe(1 + 2 + 3 + 3 + 4);
    }
  });

  it('respecte la matrice Y7S1 : niveau 30 = 9 calibrages, 17 recon, 9 exotiques', () => {
    expect(costBetween('gear', 29, 30)).toEqual({
      shdCalibration: 9,
      fieldReconData: 17,
      exoticComponents: 9,
    });
  });

  it('chaque type possède une table complète jusqu\'au niveau 30', () => {
    for (const type of ITEM_TYPES) {
      expect(COSTS[type]).toHaveLength(EXPERTISE_MAX_LEVEL);
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
    expect(mixed.steel).toBe(122);
    expect(mixed.ceramic).toBe(122);
    expect(mixed.printerFilament).toBe(130);
  });

  it('renvoie un objet vide sans objets', () => {
    expect(totalCost([])).toEqual({});
  });
});
