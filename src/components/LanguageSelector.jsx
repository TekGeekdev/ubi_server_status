import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export function LanguageSelector() {
	const { locale, setLocale, locales, t } = useTranslation();
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);

	const current = locales.find((l) => l.code === locale) || locales[0];

	useEffect(() => {
		if (!open) return;

		function handleClickOutside(e) {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setOpen(false);
			}
		}

		function handleEscape(e) {
			if (e.key === 'Escape') setOpen(false);
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open]);

	function handleSelect(code) {
		setLocale(code);
		setOpen(false);
	}

	return (
		<div ref={wrapperRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
				title={t('language.selector')}
				className={`
					group w-full flex items-center gap-2.5 px-3 py-2.5 rounded
					bg-div2-surface border border-div2-border
					hover:border-div2-orange/50 hover:bg-div2-surface/80
					transition-all duration-200 cursor-pointer
				`}
			>
				<svg
					className="w-4 h-4 text-div2-orange opacity-80"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
					/>
				</svg>
				<div className="text-left">
					<p className="text-div2-muted text-[10px] font-mono uppercase tracking-widest leading-none mb-0.5">
						{t('language.selector')}
					</p>
					<p className="text-div2-text text-sm font-semibold leading-none">
						{current.nativeLabel}
					</p>
				</div>
				<svg
					className={`w-3.5 h-3.5 text-div2-muted transition-transform duration-200 ${
						open ? 'rotate-180' : ''
					}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{open && (
				<ul
					role="listbox"
					aria-label={t('language.selector')}
					className={`
						absolute left-0 top-full mt-2 z-50 w-64
						bg-div2-surface border border-div2-border rounded
						shadow-[0_10px_40px_rgba(0,0,0,0.5)]
						max-h-80 overflow-y-auto
						animate-fade-in
					`}
				>
					{locales.map((l) => {
						const selected = l.code === locale;
						return (
							<li key={l.code} role="option" aria-selected={selected}>
								<button
									type="button"
									onClick={() => handleSelect(l.code)}
									className={`
										w-full flex items-center justify-between gap-3 px-4 py-2.5
										text-left text-sm transition-colors
										hover:bg-div2-orange/10 hover:text-div2-orange
										${selected ? 'text-div2-orange bg-div2-orange/5' : 'text-div2-text'}
									`}
								>
									<span className="flex flex-col">
										<span className="font-semibold">{l.nativeLabel}</span>
										<span className="text-div2-muted text-xs font-mono">{l.label}</span>
									</span>
									{selected && (
										<svg
											className="w-4 h-4 text-div2-orange shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2.5}
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
										</svg>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
