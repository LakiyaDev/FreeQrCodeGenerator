import { Sparkles, QrCode, ScanLine, Zap, Shield, Infinity } from 'lucide-react';

/** Hero QR visual — uses branded scan-me artwork. */
function HeroQrVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[320px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-brand-400/25 blur-xl md:bg-brand-400/20 md:blur-2xl"
        aria-hidden
      />
      <a
        href="#qr-scanner"
        className="block rounded-2xl bg-white p-3 shadow-2xl shadow-brand-500/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:p-4"
        aria-label="Scan a QR code with our built-in scanner"
      >
        <img
          src="/hero-scan-me-qr.png"
          alt="Example QR code with Scan Me label"
          className="h-auto w-full"
          width={640}
          height={640}
          decoding="async"
        />
      </a>
    </div>
  );
}

const TRUST_ITEMS = [
  { icon: Shield, label: '100% Static' },
  { icon: Zap, label: 'Instant' },
  { icon: Infinity, label: 'Never expires' },
];

/**
 * Hero layout:
 * - Mobile: copy → CTAs → QR preview → trust badges (QR never overlaps copy/CTAs)
 * - md+: two columns — copy left, QR preview right
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={[
        'relative flex w-full items-center overflow-x-hidden overflow-y-visible',
        'py-10 pb-12 sm:py-12 sm:pb-14',
        'md:overflow-hidden md:aspect-[3/2] md:min-h-[500px] md:max-h-[720px] md:py-0 md:pb-0',
        'xl:aspect-[16/9] xl:min-h-[800px] xl:max-h-[1080px]',
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
      <div className="relative z-10 mx-auto w-full max-w-[2560px] px-4 py-2 sm:px-6 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-x-20 lg:gap-y-8">
          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="mb-3 inline-flex w-fit max-w-full items-center gap-2 self-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:mb-4 sm:px-4 sm:text-sm md:self-start">
              <Sparkles className="h-4 w-4 shrink-0 text-brand-200" aria-hidden />
              100% Free · No signup required
            </span>

            <h1
              id="hero-heading"
              className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white"
            >
              Create &amp; Scan{' '}
              <span className="bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
                QR Codes
              </span>{' '}
              In Seconds
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-100 sm:mt-4 sm:text-base md:mx-0 md:max-w-xl lg:text-lg xl:text-xl">
              Generate static, customizable QR codes for URLs, text, phone, email and Wi-Fi —
              or scan any code with your camera. Free forever, works offline.
            </p>

            <div className="relative z-10 mx-auto mt-6 grid w-full max-w-sm grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:mx-0 md:max-w-none lg:max-w-xl">
              <a
                href="#choose-type"
                className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 text-sm font-semibold text-brand-700 shadow-lg shadow-black/20 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:gap-2 sm:px-4 md:px-3 md:text-[13px] lg:px-6 lg:text-base"
              >
                <QrCode className="h-5 w-5 shrink-0" aria-hidden />
                Generate QR Codes
              </a>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-white/30 bg-white/10 px-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 sm:gap-2 sm:px-4 md:px-3 md:text-[13px] lg:px-6 lg:text-base"
              >
                <ScanLine className="h-5 w-5 shrink-0" aria-hidden />
                How it Use
              </a>
            </div>

            <div className="relative z-0 mt-8 flex justify-center md:hidden">
              <HeroQrVisual />
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-2.5 md:justify-start">
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

          {/* Hero visual — tablet & desktop only */}
          <div className="hidden shrink-0 md:flex md:items-center md:justify-center lg:justify-end">
            <HeroQrVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
