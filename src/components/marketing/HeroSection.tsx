import { Sparkles, QrCode, ScanLine, Zap, Shield, Infinity } from 'lucide-react';

/** Decorative QR-style grid for the hero visual. */
function HeroQrVisual() {
  const pattern = [
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
  ];

  return (
    <div className="relative mx-auto w-full max-w-[240px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[320px]" aria-hidden>
      <div className="absolute -inset-4 rounded-3xl bg-brand-400/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/60 bg-white/90 p-4 shadow-2xl shadow-brand-500/20 backdrop-blur-sm sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Live preview
          </span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
            STATIC
          </span>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-inner sm:p-4">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)` }}
          >
            {pattern.flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={[
                    'aspect-square rounded-[2px]',
                    cell ? 'bg-slate-900' : 'bg-transparent',
                  ].join(' ')}
                />
              )),
            )}
          </div>
        </div>
        <a
          href="#qr-scanner"
          className="mt-3 block rounded-lg bg-brand-600 px-3 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
        >
          SCAN ME
        </a>
      </div>
    </div>
  );
}

const TRUST_ITEMS = [
  { icon: Shield, label: '100% Static' },
  { icon: Zap, label: 'Instant' },
  { icon: Infinity, label: 'Never expires' },
];

/**
 * Responsive hero dimensions (full-width banner, CSS-only):
 * - Mobile  (<768px):   9:16 → 1:1, max height 1200px
 * - Tablet  (768–1279): 3:2 aspect, height 500–720px
 * - Desktop (1280–1535): 16:9 aspect, height 800–1080px
 * - Ultrawide (1536+):  21:9 aspect, max height 1080px
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={[
        'relative flex w-full items-center overflow-hidden',
        /* Mobile — portrait 9:16, up to 1200px */
        'aspect-[9/16] min-h-[600px] max-h-[1200px]',
        'sm:aspect-square sm:min-h-[640px] sm:max-h-[min(100svh,1200px)]',
        /* Tablet — 3:2, 500–720px */
        'md:aspect-[3/2] md:min-h-[500px] md:max-h-[720px]',
        /* Desktop — 16:9, 800–1080px */
        'xl:aspect-[16/9] xl:min-h-[800px] xl:max-h-[1080px]',
        /* Ultrawide — 21:9 cinematic */
        '2xl:aspect-[21/9] 2xl:max-h-[1080px]',
      ].join(' ')}
    >
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(96,165,250,0.3)_0%,_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl"
        aria-hidden
      />

      {/* Content — centered within hero, readable max-width */}
      <div className="relative z-10 mx-auto w-full max-w-[2560px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-x-20 lg:gap-y-8">
          {/* Copy + CTAs */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="mb-4 inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm sm:mb-5 md:self-start">
              <Sparkles className="h-4 w-4 shrink-0 text-brand-200" aria-hidden />
              100% Free · No signup required
            </span>

            <h1
              id="hero-heading"
              className="text-[clamp(1.875rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-white"
            >
              Create &amp; scan{' '}
              <span className="bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
                QR codes
              </span>{' '}
              in seconds
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-brand-100 sm:mt-5 sm:text-lg md:mx-0 md:max-w-xl lg:text-xl">
              Generate static, customizable QR codes for URLs, text, phone, email and Wi-Fi —
              or scan any code with your camera. Free forever, works offline.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 md:max-w-xl">
              <a
                href="#choose-type"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-base font-semibold text-brand-700 shadow-lg shadow-black/20 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:px-8"
              >
                <QrCode className="h-5 w-5 shrink-0" aria-hidden />
                Generate QR Codes
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:px-8"
              >
                <ScanLine className="h-5 w-5 shrink-0" aria-hidden />
                How it Use
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3 md:justify-start">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-brand-200" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual — tablet & desktop */}
          <div className="hidden md:flex md:items-center md:justify-center lg:justify-end">
            <HeroQrVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
