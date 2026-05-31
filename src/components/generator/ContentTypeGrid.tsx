import { Link } from 'react-router-dom';
import { CONTENT_TYPES } from '@/config/contentTypes';

/** Home page grid — navigates to /create/:slug on click. */
export function ContentTypeGrid() {
  return (
    <div
      role="list"
      aria-label="Choose QR code type"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
    >
      {CONTENT_TYPES.map(({ type, slug, label, description, icon: Icon }) => (
        <Link
          key={type}
          to={`/create/${slug}`}
          role="listitem"
          className="group flex min-h-[7.5rem] flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 text-center shadow-sm transition-all hover:border-brand-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:min-h-0 sm:gap-3 sm:rounded-2xl sm:p-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 transition-colors group-hover:bg-brand-100 sm:h-12 sm:w-12 sm:rounded-xl">
            <Icon className="h-5 w-5 text-brand-500 group-hover:text-brand-600 sm:h-6 sm:w-6" aria-hidden />
          </span>
          <div className="min-w-0 space-y-0.5 sm:space-y-1">
            <span className="block text-xs font-bold text-slate-900 sm:text-sm">{label}</span>
            <span className="line-clamp-2 block text-[11px] leading-snug text-slate-500 sm:text-xs">
              {description}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
