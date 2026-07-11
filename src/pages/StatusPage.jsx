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
                <p className="text-div2-muted text-xs font-mono uppercase tracking-[0.3em]">Tom Clancy's</p>
                <h1
                  className="text-white text-3xl font-bold tracking-wider uppercase"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  The Division 2
                </h1>
              </div>
            </div>
            <p className="text-div2-muted text-sm font-mono tracking-widest uppercase ml-4 pl-3 border-l border-div2-border">
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
        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-div2-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-div2-muted" />
            {t('header.lastUpdated')} : {formatTime(lastFetch, locale)}
          </span>
          {data && (
            <span className={`flex items-center gap-1.5 ${isLive ? 'text-green-400/60' : 'text-yellow-400/60'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-400' : 'bg-yellow-400'}`} />
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
      <div className="mb-4 px-4 py-3 rounded border border-div2-border bg-div2-surface/50 flex items-start gap-3 text-xs font-mono text-div2-muted">
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
        <p className="text-div2-muted text-xs font-mono uppercase tracking-widest mb-4">{t('legend.title')}</p>
        <div className="flex flex-wrap gap-4">
          {['online', 'maintenance', 'degradation', 'interrupted'].map((status) => (
            <LegendItem key={status} status={status} label={t(`status.${status}`)} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-div2-border pt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <a
            href="https://discord.gg/thedivisiongame"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-div2-surface border border-div2-border hover:border-[#5865F2]/60 hover:bg-[#5865F2]/10 text-div2-text hover:text-[#5865F2] transition-all duration-200 text-xs font-mono"
          >
            <DiscordIcon />
            The Division
          </a>
          <a
            href="https://discord.gg/ubisoftofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-div2-surface border border-div2-border hover:border-[#5865F2]/60 hover:bg-[#5865F2]/10 text-div2-text hover:text-[#5865F2] transition-all duration-200 text-xs font-mono"
          >
            <DiscordIcon />
            Ubisoft
          </a>
        </div>
        <p className="text-div2-muted text-xs font-mono">{t('footer.text')}</p>
        <p className="text-div2-muted/40 text-xs font-mono text-center leading-relaxed max-w-xl">
          {t('footer.legal')}
        </p>
        <p className="text-div2-muted/50 text-xs font-mono">
          {t('footer.madeBy')}{' '}
          <a
            href="https://tekgeek-dev.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-div2-orange/60 hover:text-div2-orange transition-colors"
          >
            Tekgeek_dev
          </a>
        </p>
      </footer>
    </>
  );
}

function DiscordIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.02.015.04.03.052a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function LegendItem({ status, label }) {
  const DOTS = {
    online: 'bg-green-400',
    maintenance: 'bg-yellow-400',
    degradation: 'bg-orange-400',
    interrupted: 'bg-red-400',
  };
  return (
    <div className="flex items-center gap-2 text-div2-text text-sm">
      <span className={`w-2 h-2 rounded-full ${DOTS[status]}`} />
      {label}
    </div>
  );
}
