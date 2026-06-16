import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { TRANSLATIONS } from './translations';
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from './locales';

const STORAGE_KEY = 'div2-locale';

const LanguageContext = createContext(null);

function detectInitialLocale() {
	if (typeof window === 'undefined') return DEFAULT_LOCALE;

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored && isValidLocale(stored)) return stored;

	const nav = window.navigator.language || '';
	if (isValidLocale(nav)) return nav;

	const base = nav.split('-')[0];
	if (isValidLocale(base)) return base;

	return DEFAULT_LOCALE;
}

function interpolate(template, vars) {
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (_, key) =>
		Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : `{${key}}`,
	);
}

export function LanguageProvider({ children }) {
	const [locale, setLocaleState] = useState(detectInitialLocale);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = useCallback((next) => {
		if (!isValidLocale(next)) return;
		window.localStorage.setItem(STORAGE_KEY, next);
		setLocaleState(next);
	}, []);

	const t = useCallback(
		(key, vars) => {
			const dict = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE];
			const template = dict[key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key;
			return interpolate(template, vars);
		},
		[locale],
	);

	const value = useMemo(
		() => ({ locale, setLocale, t, locales: LOCALES }),
		[locale, setLocale, t],
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error('useTranslation must be used inside <LanguageProvider>');
	return ctx;
}
