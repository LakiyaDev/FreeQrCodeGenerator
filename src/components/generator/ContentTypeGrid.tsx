import { Link } from 'react-router-dom';
import { CONTENT_TYPES } from '@/config/contentTypes';

/** Home page grid — navigates to /create/:slug on click. */
export function ContentTypeGrid() {
  return (
    <div
      role="list"
      aria-label="Choose QR code type"
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
    >
      {CONTENT_TYPES.map(({ type, slug, label, description, icon: Icon }) => (
        <Link
          key={type}
          to={`/create/${slug}`}
          role="listitem"
          className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all hover:border-brand-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-100">
            <Icon className="h-6 w-6 text-brand-500 group-hover:text-brand-600" aria-hidden />
          </span>
          <div className="space-y-1">
            <span className="block text-sm font-bold text-slate-900">{label}</span>
            <span className="block text-xs leading-snug text-slate-500">{description}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
