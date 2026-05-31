import { QrCode } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Free QR Code Generator home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <QrCode className="h-5 w-5" aria-hidden />
          </span>
          <p className="text-base font-bold text-slate-900">Free QR Generator</p>
        </a>
      </div>
    </header>
  );
}
