import { useState } from 'react';
import { LanguageSelector } from '../components/LanguageSelector';
import { MaterialIcon } from '../components/MaterialIcon';
import { Panel } from '../components/Panel';
import { useTranslation } from '../i18n/LanguageContext';
import { COSTS, EXPERTISE_MAX_LEVEL, ITEM_TYPES, MATERIALS } from '../data/expertise';
import { totalCost } from '../utils/expertise';

// Couleurs par rareté, alignées sur le jeu : vert (acier, céramique,
// polycarbonate), bleu (titane, fibre, électronique), gris/blanc (châssis,
// tissu), violet (filament), rouge (exotiques)
const MATERIAL_COLORS = {
  steel: 'text-div2-green',
  ceramic: 'text-div2-green',
  polycarbonate: 'text-div2-green',
  titanium: 'text-div2-blue',
  carbonFiber: 'text-div2-blue',
  electronics: 'text-div2-blue',
  receiverComponents: 'text-div2-text',
  protectiveFabric: 'text-div2-text',
  printerFilament: 'text-div2-purple',
  shdCalibration: 'text-div2-orange',
  fieldReconData: 'text-div2-yellow',
  exoticComponents: 'text-div2-red',
};

// Ordre de la légende : groupé par couleur
const LEGEND_ORDER = [
  'steel',
  'ceramic',
  'polycarbonate',
  'titanium',
  'carbonFiber',
  'electronics',
  'receiverComponents',
  'protectiveFabric',
  'printerFilament',
  'shdCalibration',
  'fieldReconData',
  'exoticComponents',
];

let nextItemId = 1;

function createItem() {
  return { id: nextItemId++, type: 'weapon', from: 0, to: EXPERTISE_MAX_LEVEL };
}

export function ExpertisePage() {
  const { t, locale } = useTranslation();
  const [items, setItems] = useState(() => [createItem()]);
  const [hoverLevel, setHoverLevel] = useState(null);

  const formatNumber = (num) => num.toLocaleString(locale, { maximumFractionDigits: 0 });

  const updateItem = (id, patch) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const addItem = () => setItems((prev) => [...prev, createItem()]);

  const cost = totalCost(items);
  const costEntries = MATERIALS.filter((mat) => cost[mat] > 0).map((mat) => ({
    material: mat,
    amount: cost[mat],
  }));

  const exportTxt = () => {
    const lines = [
      `${t('expertise.titlePrefix')} ${t('expertise.titleAccent')} — The Division 2`,
      new Date().toLocaleString(locale),
      '----------------------------------------',
      ...items.map(
        (item, i) =>
          `${i + 1}. ${t(`expertise.type.${item.type}`)} : ${t('expertise.levelRange', {
            from: item.from,
            to: item.to,
          })}`
      ),
      '----------------------------------------',
      ...costEntries.map(({ material, amount }) => `${t(`expertise.mat.${material}`)} : ${amount}`),
      '',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expertise-div2.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-end flex-wrap gap-4 border-b border-div2-border pb-5 mb-8">
        <div>
          <p className="text-div2-orange text-[11px] uppercase tracking-[0.28em]">
            ISAC // Terminal Agent
          </p>
          <h1
            className="text-div2-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide leading-tight mt-1.5"
          >
            {t('expertise.titlePrefix')}{' '}
            <span className="text-div2-orange">{t('expertise.titleAccent')}</span>
          </h1>
          <p className="text-div2-muted text-sm mt-1.5">{t('expertise.subtitle')}</p>
        </div>
        <div className="w-48">
          <LanguageSelector />
        </div>
      </header>

      <p className="mb-7 px-4 py-3 border border-div2-border bg-div2-surface/50 text-xs text-div2-muted">
        {t('expertise.disclaimer')}
      </p>

      {/* Table des coûts par niveau */}
      <Panel title={t('expertise.matrix.title')} hint={t('expertise.matrix.hint')}>
        {/* Légende des matériaux, groupée par couleur de rareté */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5 pb-4 border-b border-div2-border/60">
          {LEGEND_ORDER.map((mat) => (
            <span key={mat} className={`flex items-center gap-1.5 ${MATERIAL_COLORS[mat]}`}>
              <MaterialIcon material={mat} className="w-4 h-4 shrink-0" />
              <span className="text-[11px] uppercase tracking-wide">
                {t(`expertise.mat.${mat}`)}
              </span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ITEM_TYPES.map((type) => (
            <CostMatrix
              key={type}
              type={type}
              hoverLevel={hoverLevel}
              onHoverLevel={setHoverLevel}
            />
          ))}
        </div>
      </Panel>

      {/* Objets à améliorer */}
      <Panel
        title={t('expertise.items.title')}
        hint={t('expertise.items.hint')}
        action={
          <button
            type="button"
            onClick={addItem}
            className="clip-panel-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest border bg-div2-orange border-div2-orange text-div2-bg glow-orange transition-all duration-150"
          >
            {t('expertise.items.add')}
          </button>
        }
      >
        {items.length === 0 ? (
          <p className="text-xs text-div2-muted/60">{t('expertise.items.empty')}</p>
        ) : (
          <div className="flex flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_110px_110px_auto] max-sm:grid-cols-2 items-end gap-3.5 px-1 py-2.5 border-b border-div2-border"
              >
                <SelectField
                  label={t('expertise.items.type')}
                  value={item.type}
                  onChange={(type) => updateItem(item.id, { type })}
                  options={ITEM_TYPES.map((type) => ({
                    value: type,
                    label: t(`expertise.type.${type}`),
                  }))}
                />
                <LevelField
                  label={t('expertise.items.from')}
                  value={item.from}
                  min={0}
                  max={EXPERTISE_MAX_LEVEL - 1}
                  onChange={(from) => updateItem(item.id, { from, to: Math.max(item.to, from + 1) })}
                />
                <LevelField
                  label={t('expertise.items.to')}
                  value={item.to}
                  min={item.from + 1}
                  max={EXPERTISE_MAX_LEVEL}
                  onChange={(to) => updateItem(item.id, { to })}
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={t('expertise.items.remove')}
                  title={t('expertise.items.remove')}
                  className="w-8 h-8 flex items-center justify-center bg-div2-surface-raised border border-div2-border text-div2-muted text-base hover:text-div2-red hover:border-div2-red/60 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {/* Coût total */}
      <Panel
        title={t('expertise.results.title')}
        hint={t('expertise.results.count', { count: items.length })}
        action={
          costEntries.length > 0 ? (
            <button
              type="button"
              onClick={exportTxt}
              className="clip-panel-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest border bg-div2-surface-raised border-div2-border text-div2-muted hover:text-div2-text hover:border-div2-muted transition-all duration-150"
            >
              {t('expertise.export')}
            </button>
          ) : null
        }
      >
        {costEntries.length === 0 ? (
          <p className="text-xs text-div2-muted/60">{t('expertise.results.empty')}</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-8 gap-y-2">
            {costEntries.map(({ material, amount }) => (
              <div key={material} className="flex justify-between items-center gap-4 border-b border-div2-border/60 pb-1.5">
                <span className={`flex items-center gap-2 ${MATERIAL_COLORS[material]}`}>
                  <MaterialIcon material={material} className="w-4 h-4 shrink-0" />
                  <span className="text-[13px] uppercase tracking-wide text-div2-text">
                    {t(`expertise.mat.${material}`)}
                  </span>
                </span>
                <span className="text-base font-bold text-div2-orange">{formatNumber(amount)}</span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function CostMatrix({ type, hoverLevel, onHoverLevel }) {
  const { t } = useTranslation();
  const rows = COSTS[type];
  const materials = MATERIALS.filter((mat) => rows.some((row) => row[mat]));
  const totals = Object.fromEntries(
    materials.map((mat) => [mat, rows.reduce((sum, row) => sum + (row[mat] || 0), 0)])
  );

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-div2-text mb-2">
        {t(`expertise.type.${type}`)}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[220px] border-collapse text-xs">
          <thead>
            <tr>
              <th className="px-1.5 pb-1.5 text-left align-bottom text-div2-muted uppercase border-b border-div2-border">
                {t('expertise.matrix.level')}
              </th>
              {materials.map((mat) => (
                <th
                  key={mat}
                  title={t(`expertise.mat.${mat}`)}
                  className={`px-1 pb-1.5 align-bottom border-b border-div2-border ${MATERIAL_COLORS[mat]}`}
                >
                  <span className="flex justify-end">
                    <MaterialIcon material={mat} className="w-4 h-4" />
                  </span>
                  <span className="sr-only">{t(`expertise.mat.${mat}`)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const level = i + 1;
              const hot = hoverLevel === level;
              return (
                <tr
                  key={level}
                  onMouseEnter={() => onHoverLevel(level)}
                  onMouseLeave={() => onHoverLevel(null)}
                  className={hot ? 'bg-div2-orange/10' : ''}
                >
                  <td
                    className={`px-1.5 py-0.5 text-left border-b border-div2-border/40 ${
                      hot ? 'text-div2-orange font-bold' : 'text-div2-muted'
                    }`}
                  >
                    {level}
                  </td>
                  {materials.map((mat) => (
                    <td
                      key={mat}
                      className={`px-1 py-0.5 text-right border-b border-div2-border/40 ${
                        row[mat] ? MATERIAL_COLORS[mat] : 'text-div2-border'
                      }`}
                    >
                      {row[mat] || '·'}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr className="bg-div2-surface-raised">
              <td className="px-1.5 py-1.5 text-left font-bold uppercase tracking-wider text-div2-orange border-t-2 border-div2-border">
                {t('expertise.matrix.total')}
              </td>
              {materials.map((mat) => (
                <td
                  key={mat}
                  className={`px-1 py-1.5 text-right font-bold border-t-2 border-div2-border ${MATERIAL_COLORS[mat]}`}
                >
                  {totals[mat]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="flex h-full flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-div2-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-auto w-full px-3 py-2 bg-div2-bg border border-div2-border text-sm text-div2-text focus:border-div2-orange focus:outline-none transition-colors"
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function LevelField({ label, value, onChange, min, max }) {
  return (
    <label className="flex h-full flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-div2-muted">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={(e) => {
          const parsed = Math.round(Number(e.target.value) || 0);
          onChange(Math.min(max, Math.max(min, parsed)));
        }}
        className="mt-auto w-full px-3 py-2 bg-div2-bg border border-div2-border text-sm text-div2-text focus:border-div2-orange focus:outline-none transition-colors"
      />
    </label>
  );
}
