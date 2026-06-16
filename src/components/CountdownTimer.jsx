import { useTranslation } from '../i18n/LanguageContext';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CountdownTimer({ countdown, total, onRefresh, loading }) {
  const { t } = useTranslation();
  const progress = countdown / total;
  const dashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      title={t('timer.refreshNow')}
      className={`
        group relative w-full flex items-center gap-3 px-4 py-2.5 rounded
        bg-div2-surface border border-div2-border
        hover:border-div2-orange/50 hover:bg-div2-surface/80
        transition-all duration-200 cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      {/* Circular countdown SVG */}
      <div className="relative w-10 h-10 shrink-0">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 48 48">
          {/* Track */}
          <circle
            cx="24" cy="24" r={RADIUS}
            fill="none"
            stroke="rgba(30,46,66,1)"
            strokeWidth="3"
          />
          {/* Progress */}
          <circle
            cx="24" cy="24" r={RADIUS}
            fill="none"
            stroke={loading ? 'rgba(232,128,10,0.4)' : 'rgba(232,128,10,0.9)'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={loading ? 0 : dashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-4 h-4 animate-spin text-div2-orange" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-div2-orange text-xs font-mono font-bold">{countdown}</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="text-left">
        <p className="text-div2-muted text-xs font-mono uppercase tracking-widest leading-none mb-0.5">
          {t('timer.label')}
        </p>
        <p className="text-div2-text text-sm font-semibold">
          {loading ? t('timer.loading') : t('timer.refresh')}
        </p>
      </div>

      {/* Hover arrow */}
      <svg
        className="w-4 h-4 text-div2-orange opacity-0 group-hover:opacity-100 transition-opacity ml-1"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );
}
