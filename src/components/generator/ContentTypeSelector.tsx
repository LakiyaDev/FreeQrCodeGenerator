import {
  Globe,
  Type,
  Phone,
  Mail,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import type { ContentType } from '@/types';

interface ContentTypeSelectorProps {
  selected: ContentType;
  onSelect: (type: ContentType) => void;
}

const TYPES: { type: ContentType; label: string; description: string; icon: LucideIcon }[] = [
  { type: 'url', label: 'URL', description: 'Link to any website', icon: Globe },
  { type: 'text', label: 'Text', description: 'Plain text message', icon: Type },
  { type: 'phone', label: 'Phone', description: 'Click-to-call number', icon: Phone },
  { type: 'email', label: 'Email', description: 'Pre-filled email', icon: Mail },
  { type: 'wifi', label: 'Wi-Fi', description: 'Network credentials', icon: Wifi },
];

export function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="QR content type"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
    >
      {TYPES.map(({ type, label, description, icon: Icon }) => {
        const isActive = selected === type;
        return (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(type)}
            className={[
              'flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
              isActive
                ? 'border-brand-500 bg-brand-50 shadow-sm dark:border-brand-400 dark:bg-brand-950/40'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600',
            ].join(' ')}
          >
            <Icon
              className={`h-6 w-6 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500'}`}
              aria-hidden
            />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
          </button>
        );
      })}
    </div>
  );
}
