import { STATUS_CONFIG } from './StatusBadge';
import { useTranslation } from '../i18n/LanguageContext';

export function GlobalStatus({ platforms }) {
  const { t } = useTranslation();

  if (!platforms || platforms.length === 0) return null;

  const priority = { interrupted: 0, degradation: 1, maintenance: 2, online: 3 };
  const worst = platforms.reduce((w, p) => {
    return priority[p.status] < priority[w] ? p.status : w;
  }, 'online');

  const cfg = STATUS_CONFIG[worst] || STATUS_CONFIG.online;
  const message = t(`globalStatus.${worst}`);

  return (
    <div className={`
      relative overflow-hidden corner-cut border px-6 py-4 flex items-center gap-4
      ${worst === 'online' ? 'border-div2-green/20 bg-div2-green/5' : ''}
      ${worst === 'maintenance' ? 'border-div2-yellow/20 bg-div2-yellow/5' : ''}
      ${worst === 'degradation' ? 'border-div2-orange/20 bg-div2-orange/5' : ''}
      ${worst === 'interrupted' ? 'border-div2-red/20 bg-div2-red/5' : ''}
    `}>
      {/* Animated dot */}
      <div className="relative shrink-0">
        <span className={`relative flex h-4 w-4`}>
          {worst === 'online' && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-40`} />
          )}
          <span className={`relative inline-flex rounded-full h-4 w-4 ${cfg.dot}`} />
        </span>
      </div>

      <div>
        <p className="text-div2-muted text-xs uppercase tracking-widest mb-0.5">{t('globalStatus.title')}</p>
        <p className={`${cfg.color} text-base font-semibold`}>{message}</p>
      </div>
    </div>
  );
}
