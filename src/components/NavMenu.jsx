import { useTranslation } from '../i18n/LanguageContext';

const LINKS = [
  { route: 'status', href: '#/', labelKey: 'nav.status' },
  { route: 'augments', href: '#/augments', labelKey: 'nav.augments' },
  { route: 'damage', href: '#/damage', labelKey: 'nav.damage' },
  { route: 'expertise', href: '#/expertise', labelKey: 'nav.expertise' },
];

export function NavMenu({ route }) {
  const { t } = useTranslation();

  return (
    <nav className="mb-8 flex items-center gap-2 border-b border-div2-border pb-4">
      <span className="hidden sm:inline text-div2-orange text-[11px] uppercase tracking-[0.28em] mr-2">
        ISAC //
      </span>
      {LINKS.map(({ route: linkRoute, href, labelKey }) => {
        const active = route === linkRoute;
        return (
          <a
            key={linkRoute}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`clip-panel-sm px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-150 ${
              active
                ? 'bg-div2-orange border-div2-orange text-div2-bg glow-orange'
                : 'bg-div2-surface-raised border-div2-border text-div2-muted hover:text-div2-text hover:border-div2-muted'
            }`}
          >
            {t(labelKey)}
          </a>
        );
      })}
    </nav>
  );
}
