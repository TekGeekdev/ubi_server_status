import { useTranslation } from '../i18n/LanguageContext';

const STATUS_CONFIG = {
  online: {
    color: 'text-div2-green',
    bg: 'bg-div2-green/10',
    border: 'border-div2-green/30',
    dot: 'bg-div2-green',
    glow: 'shadow-[0_0_8px_rgb(var(--div2-green)/0.5)]',
    pulse: true,
  },
  maintenance: {
    color: 'text-div2-yellow',
    bg: 'bg-div2-yellow/10',
    border: 'border-div2-yellow/30',
    dot: 'bg-div2-yellow',
    glow: 'shadow-[0_0_8px_rgb(var(--div2-yellow)/0.5)]',
    pulse: false,
  },
  degradation: {
    color: 'text-div2-orange',
    bg: 'bg-div2-orange/10',
    border: 'border-div2-orange/30',
    dot: 'bg-div2-orange',
    glow: 'shadow-[0_0_8px_rgb(var(--div2-orange)/0.5)]',
    pulse: false,
  },
  interrupted: {
    color: 'text-div2-red',
    bg: 'bg-div2-red/10',
    border: 'border-div2-red/30',
    dot: 'bg-div2-red',
    glow: 'shadow-[0_0_8px_rgb(var(--div2-red)/0.5)]',
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
        inline-flex items-center gap-2 rounded font-semibold tracking-wider uppercase
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
