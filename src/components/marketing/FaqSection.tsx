import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Are these QR codes static or dynamic?',
    a: 'All QR codes generated here are static. Your content is encoded directly into the QR pattern — there are no redirect URLs and codes never expire.',
  },
  {
    q: 'Do I need an account?',
    a: 'No account is required. Everything runs in your browser. History is saved locally on your device using localStorage.',
  },
  {
    q: 'What download formats are supported?',
    a: 'You can download your QR code as PNG, SVG, PDF, or JPG. You can also set a custom filename before downloading.',
  },
  {
    q: 'Can I add a logo to my QR code?',
    a: 'Yes. Upload a logo up to 2 MB and adjust its size. For best scan reliability with logos, use High (30%) error correction.',
  },
  {
    q: 'Will my QR codes work offline?',
    a: 'Yes. Static QR codes contain the data itself. Once printed or saved, they scan without any internet connection to our service.',
  },
  {
    q: 'How do Wi-Fi QR codes work?',
    a: 'We encode credentials in the standard WIFI: format. When scanned on a supported device, it offers to join the network automatically.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="faq-heading"
          className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white"
        >
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
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
