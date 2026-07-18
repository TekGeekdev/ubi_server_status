import { useServerStatus } from '../hooks/useServerStatus';
import { PlatformCard } from '../components/PlatformCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { CountdownTimer } from '../components/CountdownTimer';
import { GlobalStatus } from '../components/GlobalStatus';
import { LanguageSelector } from '../components/LanguageSelector';
import { NewsSection } from '../components/NewsSection';
import { useTranslation } from '../i18n/LanguageContext';

function formatTime(date, locale) {
  if (!date) return '—';
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function StatusPage() {
  const { data, loading, error, countdown, lastFetch, refresh, REFRESH_INTERVAL, paused, togglePause } = useServerStatus();
  const { t, locale } = useTranslation();

  const platforms = data?.platforms || [];
  const isLive = data?.source === 'live';

  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            {/* Logo text */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-div2-orange" />
              <div>
                <p className="text-div2-muted text-xs uppercase tracking-[0.3em]">Tom Clancy's</p>
                <h1
                  className="text-div2-heading text-3xl font-bold tracking-wider uppercase"
                >
                  The Division 2
                </h1>
              </div>
            </div>
            <p className="text-div2-muted text-sm tracking-widest uppercase ml-4 pl-3 border-l border-div2-border">
              {t('header.subtitle')}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-2 w-48">
            <LanguageSelector />
            <CountdownTimer
              countdown={countdown}
              total={REFRESH_INTERVAL}
              onRefresh={refresh}
              loading={loading}
              paused={paused}
              onTogglePause={togglePause}
            />
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-4 flex items-center gap-4 text-xs text-div2-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-div2-muted" />
            {t('header.lastUpdated')} : {formatTime(lastFetch, locale)}
          </span>
          {data && (
            <span className={`flex items-center gap-1.5 ${isLive ? 'text-div2-green/60' : 'text-div2-yellow/60'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-div2-green' : 'bg-div2-yellow'}`} />
              {isLive ? t('header.liveData') : t('header.fallbackData')}
            </span>
          )}
          <span className="ml-auto">
            <a
              href="https://www.ubisoft.com/fr-fr/game/the-division/the-division-2/status"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-div2-orange transition-colors"
            >
              {t('header.officialSource')} ↗
            </a>
          </span>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="mb-4 px-4 py-3 rounded border border-div2-border bg-div2-surface/50 flex items-start gap-3 text-xs text-div2-muted">
        <svg className="w-4 h-4 shrink-0 mt-0.5 text-div2-orange/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
        <p>{t('disclaimer.text')}</p>
      </div>

      {/* Global status banner */}
      {!loading && platforms.length > 0 && (
        <div className="mb-6">
          <GlobalStatus platforms={platforms} />
        </div>
      )}

      {/* Platform cards */}
      <div className="flex flex-col gap-4">
        {loading && platforms.length === 0
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          : platforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
      </div>

      {/* News */}
      <NewsSection />

      {/* Legend */}
      <div className="mt-6 border-t border-div2-border pt-6">
        <p className="text-div2-muted text-xs uppercase tracking-widest mb-4">{t('legend.title')}</p>
        <div className="flex flex-wrap gap-4">
          {['online', 'maintenance', 'degradation', 'interrupted'].map((status) => (
            <LegendItem key={status} status={status} label={t(`status.${status}`)} />
          ))}
        </div>
      </div>

    </>
  );
}

function LegendItem({ status, label }) {
  const DOTS = {
    online: 'bg-div2-green',
    maintenance: 'bg-div2-yellow',
    degradation: 'bg-div2-orange',
    interrupted: 'bg-div2-red',
  };
  return (
    <div className="flex items-center gap-2 text-div2-text text-sm">
      <span className={`w-2 h-2 rounded-full ${DOTS[status]}`} />
      {label}
    </div>
  );
}
