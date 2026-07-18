import { useMemo, useState } from 'react';
import { LanguageSelector } from '../components/LanguageSelector';
import { Panel } from '../components/Panel';
import { useTranslation } from '../i18n/LanguageContext';
import { AUGMENTS, MAX_LEVEL, MAX_PIECES } from '../data/augments';
import { parsePercent, formatPercent } from '../utils/percent';

const LEVELS = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);

export function AugmentsPage() {
  const { t } = useTranslation();
  const [level, setLevel] = useState(MAX_LEVEL);
  const [buildCounts, setBuildCounts] = useState(() =>
    Object.fromEntries(AUGMENTS.map((a) => [a.name, 0]))
  );

  const totalPieces = Object.values(buildCounts).reduce((sum, n) => sum + n, 0);
  const capReached = totalPieces >= MAX_PIECES;

  const changeCount = (name, delta) => {
    setBuildCounts((prev) => {
      if (delta > 0 && capReached) return prev;
      return { ...prev, [name]: Math.max(0, prev[name] + delta) };
    });
  };

  const ranking = useMemo(() => {
    return AUGMENTS.map((a) => ({
      name: a.name,
      value: a.values[level - 1],
      numeric: parsePercent(a.values[level - 1]),
    })).sort((a, b) => b.numeric - a.numeric);
  }, [level]);
  const rankingMax = ranking[0].numeric;

  const buildSummary = AUGMENTS.map((a) => ({
    name: a.name,
    count: buildCounts[a.name],
    combined: parsePercent(a.values[MAX_LEVEL - 1]) * buildCounts[a.name],
  }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.combined - a.combined);
  const summaryMax = buildSummary[0]?.combined || 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-end flex-wrap gap-4 border-b border-div2-border pb-5 mb-8">
        <div>
          <p className="text-div2-orange text-[11px] font-mono uppercase tracking-[0.28em]">
            ISAC // Terminal Agent
          </p>
          <h1
            className="text-white text-3xl sm:text-4xl font-bold uppercase tracking-wide leading-tight mt-1.5"
          >
            {t('augments.titlePrefix')}{' '}
            <span className="text-div2-orange">{t('augments.titleAccent')}</span>
          </h1>
          <p className="text-div2-muted text-sm mt-1.5">{t('augments.subtitle')}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="w-48">
            <LanguageSelector />
          </div>
          <div className="text-right text-xs font-mono text-div2-muted border-l border-div2-border pl-4">
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-div2-orange shadow-[0_0_8px_rgba(232,128,10,0.5)]" />
              {t('augments.feedActive')}
            </div>
            <div className="mt-1">SYNC : 09.07.2026</div>
          </div>
        </div>
      </header>

      {/* Sélection du niveau */}
      <Panel title={t('augments.level.title')} hint={t('augments.level.hint')}>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLevel(lvl)}
              className={`clip-panel-sm w-12 h-12 flex items-center justify-center font-mono text-sm font-bold border transition-all duration-150 ${
                lvl === level
                  ? 'bg-div2-orange border-div2-orange text-div2-bg glow-orange'
                  : 'bg-div2-surface-raised border-div2-border text-div2-muted hover:text-div2-text hover:border-div2-muted'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </Panel>

      {/* Classement au niveau sélectionné */}
      <Panel title={t('augments.ranking.title', { level })} hint={t('augments.ranking.hint')}>
        <div className="flex flex-col gap-2.5">
          {ranking.map((r, i) => (
            <ReadoutRow
              key={r.name}
              rank={i + 1}
              name={r.name}
              ratio={r.numeric / rankingMax}
              value={r.value}
            />
          ))}
        </div>
      </Panel>

      {/* Table de progression */}
      <Panel title={t('augments.table.title')} hint={t('augments.table.hint')}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[13px] min-w-[760px]">
            <thead>
              <tr>
                <th className="text-left px-2.5 py-2 text-[11px] uppercase tracking-wider border-b border-div2-muted/40 whitespace-nowrap text-div2-text">
                  {t('augments.table.colAugment')}
                </th>
                {LEVELS.map((lvl) => (
                  <th
                    key={lvl}
                    className={`text-right px-2.5 py-2 text-[11px] uppercase tracking-wider border-b border-div2-muted/40 whitespace-nowrap ${
                      lvl === level ? 'text-div2-orange' : 'text-div2-muted'
                    }`}
                  >
                    {t('augments.table.colLevel', { n: lvl })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUGMENTS.map((a) => (
                <tr key={a.name} className="hover:bg-div2-surface-raised">
                  <td className="text-left px-2.5 py-2 border-b border-div2-border uppercase tracking-wide text-div2-text whitespace-nowrap">
                    {a.name}
                  </td>
                  {a.values.map((v, idx) => (
                    <td
                      key={idx}
                      className={`text-right px-2.5 py-2 border-b border-div2-border whitespace-nowrap ${
                        idx + 1 === level ? 'text-div2-orange bg-div2-orange/10' : 'text-div2-text'
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Détail des effets */}
      <Panel title={t('augments.effects.title')} hint={t('augments.effects.hint')}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {AUGMENTS.map((a) => (
            <div
              key={a.name}
              className="clip-panel-md bg-div2-surface-raised border border-div2-border p-4 flex flex-col gap-2.5"
            >
              <h3 className="text-[15px] font-bold uppercase tracking-wide text-div2-text">{a.name}</h3>
              <p className="text-[13px] text-div2-muted leading-snug flex-grow">
                {t(`augments.effect.${a.name.toLowerCase()}`)}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="font-mono text-[11px] px-2 py-1 border border-div2-border text-div2-muted">
                  {t('augments.effects.gain', { gain: a.gain })}
                </span>
                <span className="font-mono text-[11px] px-2 py-1 border border-div2-orange-dark text-div2-orange">
                  {t('augments.effects.max', { value: a.values[MAX_LEVEL - 1] })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Build d'équipement */}
      <Panel title={t('augments.build.title')} hint={t('augments.build.hint')}>
        <div className="flex flex-col">
          {AUGMENTS.map((a) => {
            const count = buildCounts[a.name];
            const combined = parsePercent(a.values[MAX_LEVEL - 1]) * count;
            return (
              <div
                key={a.name}
                className="grid grid-cols-[1fr_auto_90px] items-center gap-3.5 px-1 py-2.5 border-b border-div2-border"
              >
                <div className="text-sm uppercase tracking-wide text-div2-text">
                  {a.name}
                  <span className="block font-mono text-[10px] normal-case tracking-normal text-div2-muted/60 mt-0.5">
                    {t('augments.build.rowMax', { value: a.values[MAX_LEVEL - 1] })}
                  </span>
                </div>
                <div className="flex items-center">
                  <StepperButton
                    onClick={() => changeCount(a.name, -1)}
                    disabled={count === 0}
                    label={t('augments.build.removePiece', { name: a.name })}
                  >
                    −
                  </StepperButton>
                  <span className="w-10 h-8 leading-8 text-center font-mono text-[15px] font-bold text-div2-orange bg-div2-bg border-y border-div2-border">
                    {count}
                  </span>
                  <StepperButton
                    onClick={() => changeCount(a.name, 1)}
                    disabled={capReached}
                    label={t('augments.build.addPiece', { name: a.name })}
                  >
                    +
                  </StepperButton>
                </div>
                <span
                  className={`text-right font-mono text-sm ${
                    count > 0 ? 'text-div2-orange' : 'text-div2-muted/60'
                  }`}
                >
                  {formatPercent(combined)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-xs text-div2-muted/70">
          {t('augments.build.capNote', { max: MAX_PIECES })}
        </p>

        <div className="flex justify-between items-baseline flex-wrap gap-2 mt-5 pt-4 border-t border-div2-border mb-3.5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-div2-text">
            {t('augments.build.summaryTitle')}
          </h3>
          <span className={`font-mono text-xs ${capReached ? 'text-div2-red' : 'text-div2-muted/70'}`}>
            {t('augments.build.total', { count: totalPieces, max: MAX_PIECES })}
          </span>
        </div>
        {buildSummary.length === 0 ? (
          <p className="font-mono text-xs text-div2-muted/60">{t('augments.build.empty')}</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {buildSummary.map((r, i) => (
              <ReadoutRow
                key={r.name}
                rank={i + 1}
                name={r.name}
                sub={t('augments.build.pieceCount', { count: r.count })}
                ratio={r.combined / summaryMax}
                value={formatPercent(r.combined)}
              />
            ))}
          </div>
        )}
      </Panel>

      {/* Coût en cœurs de prototype */}
      <Panel title={t('augments.cost.title')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          <CostStat value="6" label={t('augments.cost.switch')} />
          <CostStat value="31" label={t('augments.cost.upgrade')} />
        </div>
        <p className="mt-4 font-mono text-xs text-div2-muted/70">{t('augments.cost.note')}</p>
      </Panel>

      <footer className="mt-5 pt-4 border-t border-div2-border font-mono text-[11px] text-div2-muted/60 flex justify-between flex-wrap gap-2">
        <span>{t('augments.footer.frozen')}</span>
        <span>{t('augments.footer.brand')}</span>
      </footer>
    </div>
  );
}

function ReadoutRow({ rank, name, sub, ratio, value }) {
  return (
    <div className="grid grid-cols-[28px_130px_1fr_70px] max-sm:grid-cols-[20px_90px_1fr_55px] items-center gap-3 max-sm:gap-2">
      <span className="font-mono text-xs text-div2-muted/60">{String(rank).padStart(2, '0')}</span>
      <div>
        <div className="text-[13px] uppercase tracking-wide text-div2-text">{name}</div>
        {sub && <div className="font-mono text-[10px] text-div2-muted/60 mt-0.5">{sub}</div>}
      </div>
      <div className="h-2.5 bg-div2-bg border border-div2-border overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-div2-orange-dark to-div2-orange transition-all duration-300"
          style={{ width: `${(ratio * 100).toFixed(1)}%` }}
        />
      </div>
      <span className="font-mono text-[13px] text-right text-div2-orange">{value}</span>
    </div>
  );
}

function StepperButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center bg-div2-surface-raised border border-div2-border text-div2-muted font-mono text-base enabled:hover:text-div2-text enabled:hover:border-div2-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

function CostStat({ value, label }) {
  return (
    <div className="border-l-2 border-div2-orange pl-4">
      <p
        className="text-4xl font-bold text-div2-orange leading-none"
      >
        {value}
      </p>
      <p className="text-[13px] text-div2-muted mt-1.5">{label}</p>
    </div>
  );
}
