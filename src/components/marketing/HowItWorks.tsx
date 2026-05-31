import { MousePointerClick, Pencil, Download } from 'lucide-react';

const STEPS = [
  {
    icon: MousePointerClick,
    title: 'Choose content type',
    description: 'Pick URL, text, phone, email, or Wi-Fi credentials.',
  },
  {
    icon: Pencil,
    title: 'Enter your message',
    description: 'Fill in the details and customize colors, frame, and logo.',
  },
  {
    icon: Download,
    title: 'Download your QR code',
    description: 'Export as PNG, SVG, PDF, or JPG with a custom filename.',
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="how-it-works"
          className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-white"
        >
          How it works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800/50"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-400">
                <step.icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-brand-600">
                Step {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
