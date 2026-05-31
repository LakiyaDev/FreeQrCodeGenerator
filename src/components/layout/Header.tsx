import { Moon, QrCode, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export function Header({ isDark, onToggleDark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Free QR Code Generator home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <QrCode className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              Free QR Generator
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Static · Offline · Never expires
            </p>
          </div>
        </a>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
