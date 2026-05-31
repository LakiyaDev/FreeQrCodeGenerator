import type { QrHistoryItem } from '@/types';
import { HISTORY_KEY, MAX_HISTORY } from './share';

export function loadHistory(): QrHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QrHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: QrHistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
  } catch {
    // Storage full or unavailable
  }
}

export function addToHistory(
  items: QrHistoryItem[],
  item: QrHistoryItem,
): QrHistoryItem[] {
  const filtered = items.filter((i) => i.encodedValue !== item.encodedValue);
  return [item, ...filtered].slice(0, MAX_HISTORY);
}

export function removeFromHistory(
  items: QrHistoryItem[],
  id: string,
): QrHistoryItem[] {
  return items.filter((i) => i.id !== id);
}

export function clearHistory(): QrHistoryItem[] {
  saveHistory([]);
  return [];
}

export function createHistoryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
