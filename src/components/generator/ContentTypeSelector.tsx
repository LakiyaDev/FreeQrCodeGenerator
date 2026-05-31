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

const TYPES: {
  type: ContentType;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    type: 'url',
    label: 'Website URL',
    description: 'Link to a website of your choice',
    icon: Globe,
  },
  {
    type: 'text',
    label: 'Simple Text',
    description: 'Display a body of text',
    icon: Type,
  },
  {
    type: 'phone',
    label: 'Phone',
    description: 'Share a click-to-call number',
    icon: Phone,
  },
  {
    type: 'email',
    label: 'Email',
    description: 'Send a pre-filled email',
    icon: Mail,
  },
  {
    type: 'wifi',
    label: 'Wi-Fi',
    description: 'Connect to a wireless network',
    icon: Wifi,
  },
];

export function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="QR content type"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
              'flex flex-col items-center gap-3 rounded-2xl border bg-white p-5 text-center shadow-sm transition-all',
              'hover:border-brand-200 hover:shadow-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
              isActive
                ? 'border-brand-500 shadow-md ring-1 ring-brand-500/20'
                : 'border-slate-100',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-12 w-12 items-center justify-center rounded-xl',
                isActive ? 'bg-brand-100' : 'bg-brand-50',
              ].join(' ')}
            >
              <Icon
                className={`h-6 w-6 ${isActive ? 'text-brand-600' : 'text-brand-500'}`}
                aria-hidden
              />
            </span>
            <div className="space-y-1">
              <span className="block text-sm font-bold text-slate-900">{label}</span>
              <span className="block text-xs leading-snug text-slate-500">
                {description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
