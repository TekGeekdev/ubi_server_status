import { StatusBadge, STATUS_CONFIG } from './StatusBadge';
import { useTranslation } from '../i18n/LanguageContext';

function PcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7v2H8v2h8v-2h-3v-2h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 12H5V5h14v10z"/>
    </svg>
  );
}

function Ps4Icon() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-8 h-8">
      <path d="M 37.3 6.5 L 37.3 74.6 L 52.4 79.6 L 52.4 20.6 C 52.4 18.8 53.3 17.6 54.8 18.1 C 56.5 18.6 56.9 20.3 56.9 22.1 L 56.9 55.7 C 63.3 58.7 72.4 56 76.5 49.6 C 78.4 46.6 78.9 43.3 78.9 39.9 C 78.8 32.3 76.4 25.6 69.9 21.1 C 66.2 18.5 62 17 57.7 15.9 Z M 6.8 72.2 L 25.9 77.6 C 33.4 79.8 41.2 76.9 44.2 69.6 L 44.3 69.3 L 27.7 64.7 L 27.7 70.1 L 20.1 67.9 L 20.1 62.5 L 6.8 58.7 Z M 62.9 66.8 C 58.7 66.8 54.7 67.8 51.1 69.7 L 51.1 69.7 C 47.5 71.5 45.2 73.9 45.2 76.5 C 45.2 80.5 49.8 82.8 56.2 81.1 C 60.3 80 63.9 77.1 66.1 73.1 L 66.1 75.4 C 66.1 75.4 93.2 64.5 93.2 42.1 C 93.2 42.1 93.1 66.8 62.9 66.8 Z"/>
    </svg>
  );
}

function XboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.49 14.13c-1.768 1.586-3.37 2.43-3.476 2.372C5.753 17.208 4.5 14.75 4.5 12c0-1.689.528-3.252 1.425-4.538.175-.003 1.807.866 3.585 2.658 1.757 1.77 2.616 3.434 2.616 3.434s-.356.987-1.616 2.576zm1.49-7.274c-1.424-1.52-2.745-2.498-3.44-2.875C9.648 5.36 10.8 5 12 5c1.183 0 2.316.349 3.267.951-.743.399-2.03 1.36-3.267 2.905zM15.49 16.13c-1.26-1.589-1.616-2.576-1.616-2.576s.859-1.664 2.616-3.434c1.778-1.792 3.41-2.661 3.585-2.658C20.972 8.748 21.5 10.311 21.5 12c0 2.75-1.253 5.208-3.034 6.502-.106.058-1.708-.786-3.476-2.372z"/>
    </svg>
  );
}

const PLATFORM_ICONS = { pc: PcIcon, ps4: Ps4Icon, xbox: XboxIcon };

const STATUS_BORDER = {
  online: 'border-div2-green/20',
  maintenance: 'border-div2-yellow/30',
  degradation: 'border-div2-orange/30',
  interrupted: 'border-div2-red/30',
};

const STATUS_GLOW = {
  online: '',
  maintenance: 'shadow-[0_0_30px_rgb(var(--div2-yellow)/0.06)]',
  degradation: 'shadow-[0_0_30px_rgb(var(--div2-orange)/0.08)]',
  interrupted: 'shadow-[0_0_30px_rgb(var(--div2-red)/0.1)]',
};

const DEFAULT_SERVICE_KEYS = ['services.servers', 'services.shop', 'services.matchmaking', 'services.auth'];

export function PlatformCard({ platform }) {
  const { t } = useTranslation();
  const { name, icon, status, isMaintenance, impactedFeatures = [] } = platform;
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.online;
  const Icon = PLATFORM_ICONS[icon] || PcIcon;
  const borderColor = STATUS_BORDER[status] || STATUS_BORDER.online;
  const glowStyle = STATUS_GLOW[status] || '';

  // Use impacted features from the API when available; otherwise fall back to a fixed
  // service list that inherits the overall platform status.
  const services = impactedFeatures.length > 0
    ? impactedFeatures
    : DEFAULT_SERVICE_KEYS.map((key) => ({ name: t(key), status }));

  return (
    <div className={`
      relative corner-cut bg-div2-surface border ${borderColor} ${glowStyle}
      p-6 flex flex-col gap-5 animate-slide-up
      transition-all duration-300
    `}>
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${cfg.dot} opacity-70`} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`${cfg.color} opacity-80`}><Icon /></span>
          <div>
            <p className="text-div2-muted text-xs uppercase tracking-widest mb-0.5">{t('platform.title')}</p>
            <h2 className="text-div2-heading text-xl font-bold tracking-wide">
              {name}
            </h2>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      {/* Maintenance notice */}
      {isMaintenance && (
        <div className="flex items-center gap-2 text-div2-yellow/80 text-xs bg-div2-yellow/5 border border-div2-yellow/20 rounded px-3 py-2">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t('platform.maintenanceNotice')}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-div2-border" />

      {/* Services */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {services.map((svc, i) => (
          <ServiceRow key={i} label={svc.name} status={svc.status} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ label, status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.online;
  return (
    <div className="flex items-center gap-2 bg-div2-bg/60 rounded px-3 py-2">
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
      <span className="text-div2-text text-sm font-medium truncate">{label}</span>
    </div>
  );
}
