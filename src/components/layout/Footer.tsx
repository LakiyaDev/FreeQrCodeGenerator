import { Link } from 'react-router-dom';
import { QrCode, Sparkles } from 'lucide-react';
import { CONTENT_TYPES } from '@/config/contentTypes';

const GENERATOR_LABELS: Record<string, string> = {
  'website-url': 'Link QR code generator',
  vcard: 'VCard QR code generator',
  menu: 'QR code generator for restaurants',
  pdf: 'PDF QR code generator',
  app: 'QR code generator for mobile app',
  text: 'Text QR code generator',
  images: 'Image QR code generator',
  video: 'Video QR code generator',
  'social-media': 'Social media QR code generator',
  wifi: 'Wi-Fi QR code generator',
  phone: 'Phone QR code generator',
  email: 'Email QR code generator',
};

const GENERATOR_LINKS = CONTENT_TYPES.map(({ slug, label }) => ({
  slug,
  label: GENERATOR_LABELS[slug] ?? `${label} QR code generator`,
}));

const GENERATOR_COL_1 = GENERATOR_LINKS.slice(0, 6);
const GENERATOR_COL_2 = GENERATOR_LINKS.slice(6);

const COMPANY_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'FAQ', href: '/#faq' },
];

function GeneratorLinks({ items }: { items: typeof GENERATOR_LINKS }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            to={`/create/${item.slug}`}
            className="text-sm text-slate-600 transition-colors hover:text-brand-600"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AnchorLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-sm text-slate-600 transition-colors hover:text-brand-600"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/" className="mb-10 inline-flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <QrCode className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-base font-bold text-slate-900">Free QR Generator</span>
        </Link>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900">QR code generators</h3>
            <GeneratorLinks items={GENERATOR_COL_1} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">QR code generators</h3>
            <GeneratorLinks items={GENERATOR_COL_2} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Company</h3>
            <AnchorLinks links={COMPANY_LINKS} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Help</h3>
            <AnchorLinks links={[{ label: 'FAQ', href: '/#faq' }]} />
            <p className="mt-6 flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Sparkles className="h-4 w-4 text-brand-600" aria-hidden />
              Free tools
            </p>
            <AnchorLinks links={[{ label: 'QR Code scanner', href: '/#qr-scanner' }]} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-medium text-slate-700">Free QR Generator</span>
          <span>
            © {year} Free QR Generator. Developed by LakiyaDeV. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
