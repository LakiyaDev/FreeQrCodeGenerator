import { useCallback, useEffect, useState } from 'react';
import type { QrHistoryItem } from '@/types';
import {
  addToHistory,
  clearHistory as clearAll,
  loadHistory,
  removeFromHistory,
  saveHistory,
} from '@/lib/history';

/** Manage QR generation history in localStorage. */
export function useQrHistory() {
  const [history, setHistory] = useState<QrHistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveHistory(history);
  }, [history, loaded]);

  const addItem = useCallback((item: QrHistoryItem) => {
    setHistory((prev) => addToHistory(prev, item));
  }, []);

  const removeItem = useCallback((id: string) => {
    setHistory((prev) => removeFromHistory(prev, id));
  }, []);

  const clear = useCallback(() => {
    clearAll();
    setHistory([]);
  }, []);

  return { history, addItem, removeItem, clear, loaded };
}
