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
      <h3 className="text-sm font-bold leading-none text-white">{title}</h3>
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
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background — matches hero section */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <div className="shrink-0 lg:w-52 xl:w-56">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20">
                <QrCode className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-base font-bold text-white">Free QR Generator</span>
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-x-6 lg:gap-x-8">
            <FooterColumn title="QR code generators">
              <FooterLinkList>
                {GENERATOR_COL_1.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/create/${item.slug}`}
                      className="block text-sm leading-snug text-brand-100 transition-colors hover:text-white"
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
                      className="block text-sm leading-snug text-brand-100 transition-colors hover:text-white"
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
                      className="block text-sm leading-snug text-brand-100 transition-colors hover:text-white"
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
                    className="block text-sm leading-snug text-brand-100 transition-colors hover:text-white"
                  >
                    FAQ
                  </a>
                </li>
                <li className="pt-2">
                  <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <Sparkles className="h-4 w-4 shrink-0 text-brand-200" aria-hidden />
                    Free tools
                  </span>
                </li>
                <li>
                  <a
                    href="/#qr-scanner"
                    className="block text-sm leading-snug text-brand-100 transition-colors hover:text-white"
                  >
                    QR Code scanner
                  </a>
                </li>
              </FooterLinkList>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-xs sm:px-6 sm:py-6 sm:text-sm lg:px-8">
          <span className="w-full text-center font-medium text-white">
            Free QR Generator
          </span>
          <span className="w-full max-w-sm text-center leading-relaxed text-brand-100 sm:max-w-none">
            © {year} Free QR Generator. Developed by LakiyaDeV. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
