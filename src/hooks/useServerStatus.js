import { useState, useEffect, useCallback, useRef } from 'react';

const REFRESH_INTERVAL = 120; // seconds

export function useServerStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [lastFetch, setLastFetch] = useState(null);
  const [paused, setPaused] = useState(false);
  const countdownRef = useRef(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const json = await res.json();
      setData(json);
      setLastFetch(new Date());
      setCountdown(REFRESH_INTERVAL);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh countdown
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    if (paused) {
      clearInterval(countdownRef.current);
      return;
    }

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStatus();
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownRef.current);
  }, [fetchStatus, paused]);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      if (p) setCountdown(REFRESH_INTERVAL);
      return !p;
    });
  }, []);

  return {
    data,
    loading,
    error,
    countdown,
    lastFetch,
    refresh: fetchStatus,
    REFRESH_INTERVAL,
    paused,
    togglePause,
  };
}
