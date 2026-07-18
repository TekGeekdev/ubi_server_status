import { useState } from 'react';
import { LanguageSelector } from '../components/LanguageSelector';
import { Panel } from '../components/Panel';
import { useTranslation } from '../i18n/LanguageContext';
import {
  CHC_CAP,
  weaponShotDamage,
  expectedBulletDamage,
  burstDps,
  sustainedDps,
  skillDamage,
  statusEffectDamage,
} from '../utils/damage';

// Intervalles et durées de base indicatifs des effets dommageables ;
// les dégâts par tick dépendent de la source (talent, arme, compétence).
const STATUS_PRESETS = {
  burn: { interval: 0.5, duration: 5 },
  bleed: { interval: 1, duration: 6 },
  poison: { interval: 1, duration: 10 },
};

const WEAPON_DEFAULTS = {
  base: 45000,
  wd: 90,
  chc: 50,
  chd: 130,
  hsd: 80,
  hsRate: 30,
  dta: 10,
  toc: 10,
  amp: 0,
  rpm: 750,
  mag: 30,
  reload: 2.5,
};
const SKILL_DEFAULTS = { base: 250000, sd: 30, amp: 0 };
const STATUS_DEFAULTS = { preset: 'burn', tick: 20000, interval: 0.5, duration: 5, bonus: 50 };

const WEAPON_ZERO = { base: 0, wd: 0, chc: 0, chd: 0, hsd: 0, hsRate: 0, dta: 0, toc: 0, amp: 0, rpm: 0, mag: 0, reload: 0 };
const SKILL_ZERO = { base: 0, sd: 0, amp: 0 };
const STATUS_ZERO = { preset: 'custom', tick: 0, interval: 0, duration: 0, bonus: 0 };

export function DamagePage() {
  const { t, locale } = useTranslation();

  const [weapon, setWeapon] = useState(WEAPON_DEFAULTS);
  const [skill, setSkill] = useState(SKILL_DEFAULTS);
  const [status, setStatus] = useState(STATUS_DEFAULTS);

  const formatNumber = (num) =>
    Math.round(num).toLocaleString(locale, { maximumFractionDigits: 0 });
  const formatSeconds = (num) =>
    num.toLocaleString(locale, { maximumFractionDigits: 1 });

  const setWeaponField = (field) => (value) => setWeapon((prev) => ({ ...prev, [field]: value }));
  const setSkillField = (field) => (value) => setSkill((prev) => ({ ...prev, [field]: value }));
  const setStatusField = (field) => (value) =>
    setStatus((prev) => ({ ...prev, [field]: value, preset: 'custom' }));

  const selectPreset = (preset) =>
    setStatus((prev) =>
      preset === 'custom' ? { ...prev, preset } : { ...prev, preset, ...STATUS_PRESETS[preset] }
    );

  // Les champs sont saisis en pourcentages, les formules attendent des fractions
  const weaponStats = {
    base: weapon.base,
    wd: weapon.wd / 100,
    chd: weapon.chd / 100,
    hsd: weapon.hsd / 100,
    dta: weapon.dta / 100,
    toc: weapon.toc / 100,
    amp: weapon.amp / 100,
  };
  const bodyShot = weaponShotDamage(weaponStats);
  const critShot = weaponShotDamage(weaponStats, { crit: true });
  const headShot = weaponShotDamage(weaponStats, { headshot: true });
  const critHeadShot = weaponShotDamage(weaponStats, { crit: true, headshot: true });
  const avgBullet = expectedBulletDamage(weaponStats, {
    chc: weapon.chc / 100,
    hsRate: weapon.hsRate / 100,
  });

  const skillResult = skillDamage({ base: skill.base, sd: skill.sd / 100, amp: skill.amp / 100 });

  const statusResult = statusEffectDamage({
    tick: status.tick,
    interval: status.interval,
    duration: status.duration,
    bonus: status.bonus / 100,
  });

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
            {t('damage.titlePrefix')}{' '}
            <span className="text-div2-orange">{t('damage.titleAccent')}</span>
          </h1>
          <p className="text-div2-muted text-sm mt-1.5">{t('damage.subtitle')}</p>
        </div>
        <div className="w-48">
          <LanguageSelector />
        </div>
      </header>

      <p className="mb-7 px-4 py-3 border border-div2-border bg-div2-surface/50 text-xs text-div2-muted">
        {t('damage.disclaimer')}
      </p>

      {/* Armes à feu */}
      <Panel
        title={t('damage.weapon.title')}
        hint={t('damage.weapon.hint')}
        action={<ResetButton label={t('damage.reset')} onClick={() => setWeapon({ ...WEAPON_ZERO })} />}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          <NumberField label={t('damage.weapon.baseDamage')} value={weapon.base} onChange={setWeaponField('base')} step={1000} />
          <NumberField label={t('damage.weapon.wd')} value={weapon.wd} onChange={setWeaponField('wd')} />
          <NumberField label={t('damage.weapon.chc')} value={weapon.chc} onChange={setWeaponField('chc')} max={100} />
          <NumberField label={t('damage.weapon.chd')} value={weapon.chd} onChange={setWeaponField('chd')} />
          <NumberField label={t('damage.weapon.hsd')} value={weapon.hsd} onChange={setWeaponField('hsd')} />
          <NumberField label={t('damage.weapon.hsRate')} value={weapon.hsRate} onChange={setWeaponField('hsRate')} max={100} />
          <NumberField label={t('damage.weapon.dta')} value={weapon.dta} onChange={setWeaponField('dta')} />
          <NumberField label={t('damage.weapon.toc')} value={weapon.toc} onChange={setWeaponField('toc')} />
          <NumberField label={t('damage.weapon.amp')} value={weapon.amp} onChange={setWeaponField('amp')} />
          <NumberField label={t('damage.weapon.rpm')} value={weapon.rpm} onChange={setWeaponField('rpm')} step={10} />
          <NumberField label={t('damage.weapon.mag')} value={weapon.mag} onChange={setWeaponField('mag')} />
          <NumberField label={t('damage.weapon.reload')} value={weapon.reload} onChange={setWeaponField('reload')} step={0.1} />
        </div>
        {weapon.chc > CHC_CAP * 100 && (
          <p className="mt-3 text-xs text-div2-yellow">{t('damage.weapon.chcCap')}</p>
        )}

        <ResultGrid
          rows={[
            { label: t('damage.result.body'), value: formatNumber(bodyShot) },
            { label: t('damage.result.crit'), value: formatNumber(critShot) },
            { label: t('damage.result.head'), value: formatNumber(headShot) },
            { label: t('damage.result.critHead'), value: formatNumber(critHeadShot), highlight: true },
            // Écho répète les dégâts du tir une seconde fois : affiché à titre
            // indicatif, exclu des moyennes et des DPS (c'est un proc aléatoire)
            { label: t('damage.result.echo'), value: formatNumber(critHeadShot * 2) },
            { label: t('damage.result.avg'), value: formatNumber(avgBullet) },
            { label: t('damage.result.burst'), value: formatNumber(burstDps(avgBullet, weapon.rpm)) },
            {
              label: t('damage.result.sustained'),
              value: formatNumber(sustainedDps(avgBullet, { rpm: weapon.rpm, mag: weapon.mag, reload: weapon.reload })),
            },
          ]}
        />
      </Panel>

      {/* Compétences */}
      <Panel
        title={t('damage.skill.title')}
        hint={t('damage.skill.hint')}
        action={<ResetButton label={t('damage.reset')} onClick={() => setSkill({ ...SKILL_ZERO })} />}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          <NumberField label={t('damage.skill.base')} value={skill.base} onChange={setSkillField('base')} step={1000} />
          <NumberField label={t('damage.skill.sd')} value={skill.sd} onChange={setSkillField('sd')} />
          <NumberField label={t('damage.skill.amp')} value={skill.amp} onChange={setSkillField('amp')} />
        </div>
        <p className="mt-3 text-xs text-div2-muted/70">{t('damage.skill.tierNote')}</p>

        <ResultGrid rows={[{ label: t('damage.skill.result'), value: formatNumber(skillResult), highlight: true }]} />
      </Panel>

      {/* Effets d'état */}
      <Panel
        title={t('damage.status.title')}
        hint={t('damage.status.hint')}
        action={<ResetButton label={t('damage.reset')} onClick={() => setStatus({ ...STATUS_ZERO })} />}
      >
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs uppercase tracking-widest text-div2-muted mr-2">
            {t('damage.status.effect')}
          </span>
          {['burn', 'bleed', 'poison', 'custom'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => selectPreset(preset)}
              className={`clip-panel-sm px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all duration-150 ${
                status.preset === preset
                  ? 'bg-div2-orange border-div2-orange text-div2-bg glow-orange'
                  : 'bg-div2-surface-raised border-div2-border text-div2-muted hover:text-div2-text hover:border-div2-muted'
              }`}
            >
              {t(`damage.status.${preset}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          <NumberField label={t('damage.status.tick')} value={status.tick} onChange={setStatusField('tick')} step={1000} />
          <NumberField label={t('damage.status.interval')} value={status.interval} onChange={setStatusField('interval')} step={0.1} />
          <NumberField label={t('damage.status.duration')} value={status.duration} onChange={setStatusField('duration')} step={0.5} />
          <NumberField label={t('damage.status.bonus')} value={status.bonus} onChange={setStatusField('bonus')} />
        </div>
        <p className="mt-3 text-xs text-div2-muted/70">{t('damage.status.bonusNote')}</p>

        <ResultGrid
          rows={[
            { label: t('damage.status.tick'), value: formatNumber(statusResult.tickDamage) },
            { label: t('damage.status.durationResult'), value: formatSeconds(statusResult.duration) },
            { label: t('damage.status.ticks'), value: String(statusResult.ticks) },
            { label: t('damage.status.total'), value: formatNumber(statusResult.total), highlight: true },
            { label: t('damage.status.dps'), value: formatNumber(statusResult.dps) },
          ]}
        />
      </Panel>
    </div>
  );
}

function ResetButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="clip-panel-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest border bg-div2-surface-raised border-div2-border text-div2-muted hover:text-div2-text hover:border-div2-muted transition-all duration-150"
    >
      {label}
    </button>
  );
}

function NumberField({ label, value, onChange, step = 1, min = 0, max }) {
  return (
    // h-full + mt-auto : les inputs restent alignés sur une même ligne
    // même quand certains libellés passent sur deux lignes
    <label className="flex h-full flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-div2-muted">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="mt-auto w-full px-3 py-2 bg-div2-bg border border-div2-border text-sm text-div2-text focus:border-div2-orange focus:outline-none transition-colors"
      />
    </label>
  );
}

function ResultGrid({ rows }) {
  return (
    <div className="mt-5 pt-4 border-t border-div2-border flex flex-col gap-2">
      {rows.map(({ label, value, highlight }) => (
        <div key={label} className="flex justify-between items-baseline gap-4">
          <span className="text-[13px] uppercase tracking-wide text-div2-text">{label}</span>
          <span
            className={`text-right ${
              highlight ? 'text-div2-orange text-lg font-bold' : 'text-div2-orange text-sm'
            }`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
