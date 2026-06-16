import { useState, useEffect } from 'react';

export function useNews() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			try {
				const res = await fetch('/api/news');
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json();
				if (!cancelled) setData(json);
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		load();
		return () => { cancelled = true; };
	}, []);

	return { articles: data?.articles || [], loading, error };
}
