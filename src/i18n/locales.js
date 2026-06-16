export const LOCALES = [
	{ code: 'zh-TW', label: 'Chinese - Traditional', nativeLabel: '繁體中文' },
	{ code: 'cs', label: 'Czech', nativeLabel: 'Čeština' },
	{ code: 'en', label: 'English', nativeLabel: 'English' },
	{ code: 'en-US', label: 'English - US', nativeLabel: 'English (US)' },
	{ code: 'fr', label: 'French', nativeLabel: 'Français' },
	{ code: 'de', label: 'German', nativeLabel: 'Deutsch' },
	{ code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
	{ code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
	{ code: 'ko', label: 'Korean', nativeLabel: '한국어' },
	{ code: 'pl', label: 'Polish', nativeLabel: 'Polski' },
	{ code: 'pt-BR', label: 'Portuguese - Brazil', nativeLabel: 'Português (Brasil)' },
	{ code: 'pt', label: 'Portuguese - EU', nativeLabel: 'Português (Portugal)' },
	{ code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
	{ code: 'es', label: 'Spanish', nativeLabel: 'Español' },
	{ code: 'es-419', label: 'Spanish - LATAM', nativeLabel: 'Español (LATAM)' },
];

export const DEFAULT_LOCALE = 'fr';

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function isValidLocale(code) {
	return LOCALE_CODES.includes(code);
}

export function getLocale(code) {
	return LOCALES.find((l) => l.code === code) || LOCALES.find((l) => l.code === DEFAULT_LOCALE);
}
