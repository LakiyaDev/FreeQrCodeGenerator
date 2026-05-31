import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  ScanLine,
  Layers,
  History,
  Palette,
  Download,
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Globe,
    title: 'No website needed',
    description:
      'Select the material you want to share. Link web pages, PDFs, menus, videos, apps and more.',
  },
  {
    icon: ScanLine,
    title: 'Scannable on any device',
    description:
      'Static codes with adjustable error correction scan reliably on phones, tablets and dedicated readers.',
  },
  {
    icon: Layers,
    title: '12+ different QR code types',
    description:
      'From a simple URL to vCards, Wi-Fi, apps and menus — pick the format that fits your use case.',
  },
  {
    icon: History,
    title: 'Keep track locally',
    description:
      'Your recent QR codes are saved in the browser so you can restore designs and download them again anytime.',
  },
  {
    icon: Palette,
    title: 'Infinite customization options',
    description:
      'Go beyond black and white. Add your logo, pick colors, choose a frame style and make your code stand out.',
  },
  {
    icon: Download,
    title: 'Download, share, edit',
    description:
      'Export in PNG, SVG, PDF or JPG at high resolution. Share to social platforms or tweak and regenerate whenever you need.',
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-14">
          <h2
            id="features-heading"
            className="mx-auto w-full text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl xl:text-4xl"
          >
            Free QR Generator, the most advanced QR code generator
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Packed with useful features, our easy-to-use QR code generator helps you create
            professional codes for marketing, customer experience and everyday sharing — free
            forever, with no account required.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-slate-200 p-px">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="flex flex-col items-center bg-white px-6 py-10 text-center sm:px-8 sm:py-12"
                >
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="h-8 w-8" aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
