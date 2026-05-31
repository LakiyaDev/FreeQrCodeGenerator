import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqCategory = 'basics' | 'generating' | 'scanning';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'basics', label: 'Basics' },
  { id: 'generating', label: 'Generating & designing' },
  { id: 'scanning', label: 'Scanning & printing' },
];

const FAQ_BY_CATEGORY: Record<FaqCategory, FaqItem[]> = {
  basics: [
    {
      q: 'What is the difference between static and dynamic QR codes?',
      a: 'Static QR codes encode your content directly in the pattern — they never expire and work offline. Dynamic codes point to a short URL that can be changed later, usually through a paid service. Free QR Generator creates static codes only.',
    },
    {
      q: 'Do I need an account?',
      a: 'No account is required. Everything runs in your browser. Your recent QR codes are saved locally on your device using localStorage.',
    },
    {
      q: 'Are these QR codes free forever?',
      a: 'Yes. There are no subscriptions, scan limits, or hidden fees. Generate, customize, download, and scan as much as you like.',
    },
    {
      q: 'Will my QR codes work offline?',
      a: 'Yes. Static QR codes contain the data itself. Once printed or saved, they scan without any connection to our website.',
    },
  ],
  generating: [
    {
      q: 'Can I make custom QR codes?',
      a: 'Yes. Choose from 12+ content types, then customize foreground and background colors, frame styles, error correction, and an optional logo.',
    },
    {
      q: 'Can I edit my QR codes after creating them?',
      a: 'Static codes cannot be edited once generated — the encoded data is fixed. You can restore a recent code from your browser history, change the design, and download a new version anytime.',
    },
    {
      q: 'How many QR codes can I generate?',
      a: 'There is no limit. Create as many codes as you need. Up to 24 recent codes are kept in your browser history for quick access.',
    },
    {
      q: 'What is the best QR code file format?',
      a: 'Use PNG or JPG for web and social media, SVG for scalable print and design tools, and PDF when you need a ready-to-print document.',
    },
    {
      q: 'Can I add a logo to my QR code?',
      a: 'Yes. Upload a logo up to 2 MB and adjust its size. For best scan reliability with logos, use High (30%) error correction.',
    },
  ],
  scanning: [
    {
      q: 'How do I scan a QR code on this site?',
      a: 'Scroll to the Scan a QR code section, tap Start camera to use your device camera, or upload a photo containing a QR code. Results appear instantly in your browser.',
    },
    {
      q: 'What download formats are supported for printing?',
      a: 'Download as PNG, SVG, PDF, or JPG. SVG and PDF are best for professional print; PNG and JPG work well for screens and quick shares.',
    },
    {
      q: 'How do Wi-Fi QR codes work?',
      a: 'We encode credentials in the standard WIFI: format. When scanned on a supported phone or tablet, it offers to join the network automatically.',
    },
    {
      q: 'What size should I print my QR code?',
      a: 'Print at least 2 × 2 cm (about 0.8 in) for close-range scanning. For posters or signage, go larger and test from the distance your audience will use.',
    },
  ],
};

export function FaqSection() {
  const [category, setCategory] = useState<FaqCategory>('generating');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = FAQ_BY_CATEGORY[category];

  const handleCategoryChange = (id: FaqCategory) => {
    setCategory(id);
    setOpenIndex(0);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            Most common questions about our service
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
            Get answers to your questions about QR codes
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="FAQ categories"
        >
          {FAQ_CATEGORIES.map(({ id, label }) => {
            const isActive = category === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(id)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 sm:py-2.5',
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900',
                ].join(' ')}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          role="tabpanel"
        >
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const isLast = i === items.length - 1;
            return (
              <div
                key={item.q}
                className={isLast ? '' : 'border-b border-slate-200'}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={[
                      'h-5 w-5 shrink-0 text-brand-600 transition-transform',
                      isOpen ? 'rotate-180' : '',
                    ].join(' ')}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                    <p className="pt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
