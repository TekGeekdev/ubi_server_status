import { useTranslation } from '../i18n/LanguageContext';

const STATUS_CONFIG = {
  online: {
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    dot: 'bg-green-400',
    glow: 'shadow-[0_0_8px_rgba(74,222,128,0.5)]',
    pulse: true,
  },
  maintenance: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    dot: 'bg-yellow-400',
    glow: 'shadow-[0_0_8px_rgba(250,204,21,0.5)]',
    pulse: false,
  },
  degradation: {
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    dot: 'bg-orange-400',
    glow: 'shadow-[0_0_8px_rgba(251,146,60,0.5)]',
    pulse: false,
  },
  interrupted: {
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    dot: 'bg-red-400',
    glow: 'shadow-[0_0_8px_rgba(248,113,113,0.5)]',
    pulse: false,
  },
};

export function StatusBadge({ status, size = 'md' }) {
  const { t } = useTranslation();
  const key = STATUS_CONFIG[status] ? status : 'online';
  const cfg = STATUS_CONFIG[key];
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded font-mono font-semibold tracking-wider uppercase
        border ${cfg.bg} ${cfg.border} ${cfg.color} ${cfg.glow} ${sizes[size]}
      `}
    >
      <span className="relative flex h-2 w-2">
        {cfg.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`} />
      </span>
      {t(`status.${key}`)}
    </span>
  );
}

export { STATUS_CONFIG };
