import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { CreateQrPage } from '@/pages/CreateQrPage';
import { QrHistoryProvider } from '@/context/QrHistoryContext';

function AppLayout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <QrHistoryProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route
            path="/create/:slug"
            element={
              <AppLayout showFooter={false}>
                <CreateQrPage />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QrHistoryProvider>
  );
}
