import { useCallback, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/marketing/HeroSection';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { FaqSection } from '@/components/marketing/FaqSection';
import { QrGenerator } from '@/components/generator/QrGenerator';
import { HistorySection } from '@/components/history/HistorySection';
import { QrHistoryProvider, useQrHistoryContext } from '@/context/QrHistoryContext';
import type { QrHistoryItem } from '@/types';

function AppContent() {
  const { history, removeItem, clear } = useQrHistoryContext();
  const [restoreKey, setRestoreKey] = useState(0);

  const handleRestore = useCallback((item: QrHistoryItem) => {
    sessionStorage.setItem('qr-restore', JSON.stringify(item));
    setRestoreKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <div className="pb-16">
          <QrGenerator key={restoreKey} />
        </div>

        <div className="border-t border-slate-200 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HistorySection
              history={history}
              onRestore={handleRestore}
              onRemove={removeItem}
              onClear={clear}
            />
          </div>
        </div>

        <HowItWorks />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QrHistoryProvider>
      <AppContent />
    </QrHistoryProvider>
  );
}
