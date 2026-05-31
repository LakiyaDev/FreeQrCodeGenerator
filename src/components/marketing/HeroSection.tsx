import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50/80 to-transparent dark:from-brand-950/30" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" />
          100% Free · No signup required
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
          Create static QR codes{' '}
          <span className="text-brand-600 dark:text-brand-400">that never expire</span>
        </h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-300">
          Generate customizable QR codes for URLs, text, phone, email, and Wi-Fi.
          Your data is encoded directly — no redirects, works offline, free forever.
        </p>
      </div>
    </section>
  );
}
