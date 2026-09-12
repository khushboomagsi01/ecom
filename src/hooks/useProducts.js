import { useState, useEffect, useCallback, useRef } from 'react';

export function useProducts(params = {}) {
  const [data, setData] = useState({ products: [], total: 0, categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchProducts = useCallback(async (searchParams) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const qs = new URLSearchParams();
      Object.entries(searchParams).forEach(([k, v]) => {
        if (v !== '' && v !== undefined && v !== null) qs.set(k, v);
      });

      const res = await fetch(`/api/products?${qs}`, { signal: controller.signal });
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      if (!controller.signal.aborted) setData(json);
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(params);
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [fetchProducts, params.search, params.category, params.sort, params.order, params.page, params.limit]);

  return { ...data, loading, error, refetch: fetchProducts };
}

export function useClickTracking() {
  const sessionId = useRef(null);
  if (!sessionId.current) {
    sessionId.current = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  const track = useCallback(async (productId, eventType) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, eventType, sessionId: sessionId.current }),
      });
    } catch (e) {
      console.warn('Tracking failed:', e);
    }
  }, []);

  return { track, sessionId: sessionId.current };
}

export function useAnalytics(days = 7) {
  const [popular, setPopular] = useState([]);
  const [summary, setSummary] = useState({ totalClicks: 0, uniqueSessions: 0, topCategories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [popRes, sumRes] = await Promise.all([
          fetch(`/api/analytics/popular?days=${days}&limit=10`),
          fetch(`/api/analytics/summary?days=${days}`),
        ]);
        if (!mounted) return;
        setPopular(await popRes.json());
        setSummary(await sumRes.json());
      } catch (e) {
        console.error('Analytics load failed:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [days]);

  return { popular, summary, loading };
}