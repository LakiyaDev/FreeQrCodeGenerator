import { createContext, useContext, type ReactNode } from 'react';
import { useQrHistory } from '@/hooks/useQrHistory';

type QrHistoryContextValue = ReturnType<typeof useQrHistory>;

const QrHistoryContext = createContext<QrHistoryContextValue | null>(null);

export function QrHistoryProvider({ children }: { children: ReactNode }) {
  const value = useQrHistory();
  return (
    <QrHistoryContext.Provider value={value}>{children}</QrHistoryContext.Provider>
  );
}

export function useQrHistoryContext(): QrHistoryContextValue {
  const ctx = useContext(QrHistoryContext);
  if (!ctx) {
    throw new Error('useQrHistoryContext must be used within QrHistoryProvider');
  }
  return ctx;
}
