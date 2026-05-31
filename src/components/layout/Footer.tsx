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

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm font-bold leading-none text-slate-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterLinkList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5">{children}</ul>;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <div className="shrink-0 lg:w-52 xl:w-56">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                <QrCode className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-base font-bold text-slate-900">Free QR Generator</span>
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-4 md:gap-x-6 lg:gap-x-8">
            <FooterColumn title="QR code generators">
              <FooterLinkList>
                {GENERATOR_COL_1.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/create/${item.slug}`}
                      className="block text-sm leading-snug text-slate-600 transition-colors hover:text-brand-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </FooterLinkList>
            </FooterColumn>

            <FooterColumn title="QR code generators">
              <FooterLinkList>
                {GENERATOR_COL_2.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/create/${item.slug}`}
                      className="block text-sm leading-snug text-slate-600 transition-colors hover:text-brand-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </FooterLinkList>
            </FooterColumn>

            <FooterColumn title="Company">
              <FooterLinkList>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block text-sm leading-snug text-slate-600 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </FooterLinkList>
            </FooterColumn>

            <FooterColumn title="Help">
              <FooterLinkList>
                <li>
                  <a
                    href="/#faq"
                    className="block text-sm leading-snug text-slate-600 transition-colors hover:text-brand-600"
                  >
                    FAQ
                  </a>
                </li>
                <li className="pt-2">
                  <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                    <Sparkles className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    Free tools
                  </span>
                </li>
                <li>
                  <a
                    href="/#qr-scanner"
                    className="block text-sm leading-snug text-slate-600 transition-colors hover:text-brand-600"
                  >
                    QR Code scanner
                  </a>
                </li>
              </FooterLinkList>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-6 text-sm sm:grid-cols-2 sm:px-6 lg:px-8">
          <span className="text-center font-medium text-slate-700 sm:text-left">
            Free QR Generator
          </span>
          <span className="text-center text-slate-500 sm:text-right">
            © {year} Free QR Generator. Developed by LakiyaDeV. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
