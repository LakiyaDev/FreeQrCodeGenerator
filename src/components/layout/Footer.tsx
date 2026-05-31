import { Shield, Zap, Infinity } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                100% Static
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Your data is encoded directly — no redirect services, no expiration.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Zap className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Instant &amp; Offline
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                QR codes generate in your browser. Works without an account.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Infinity className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Free Forever
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Download PNG, SVG, PDF, or JPG with full customization.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-500">
          © {year} Free QR Code Generator. Built with React &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
