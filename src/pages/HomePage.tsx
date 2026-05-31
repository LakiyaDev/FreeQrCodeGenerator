import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ChooseTypeSection } from '@/components/marketing/ChooseTypeSection';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { HistorySection } from '@/components/history/HistorySection';
import { useQrHistoryContext } from '@/context/QrHistoryContext';
import { getContentTypeMeta } from '@/config/contentTypes';
import type { QrHistoryItem } from '@/types';

const QrScannerSection = lazy(() =>
  import('@/components/scanner/QrScannerSection').then((m) => ({
    default: m.QrScannerSection,
  })),
);

function ScannerFallback() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
        Loading scanner…
      </div>
    </section>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { history, removeItem, clear } = useQrHistoryContext();

  useEffect(() => {
    if (location.hash === '#choose-type') {
      document.getElementById('choose-type')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const handleRestore = useCallback(
    (item: QrHistoryItem) => {
      sessionStorage.setItem('qr-restore', JSON.stringify(item));
      const slug = getContentTypeMeta(item.contentType).slug;
      navigate(`/create/${slug}`);
    },
    [navigate],
  );

  return (
    <>
      <HeroSection />
      <ChooseTypeSection />

      <div className="border-t border-slate-200 bg-white py-16">
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
      <Suspense fallback={<ScannerFallback />}>
        <QrScannerSection />
      </Suspense>
      <FeaturesSection />
      <FaqSection />
    </>
  );
}
