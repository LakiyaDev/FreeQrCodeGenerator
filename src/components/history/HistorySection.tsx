import { Clock, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { QrHistoryItem } from '@/types';
import { CONTENT_TYPE_LABELS } from '@/types';

interface HistorySectionProps {
  history: QrHistoryItem[];
  onRestore: (item: QrHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function HistorySection({
  history,
  onRestore,
  onRemove,
  onClear,
}: HistorySectionProps) {
  if (history.length === 0) {
    return (
      <section
        id="history"
        aria-labelledby="history-heading"
        className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/20"
      >
        <Clock className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <h2
          id="history-heading"
          className="text-lg font-semibold text-slate-900 dark:text-white"
        >
          Recent QR Codes
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your generated QR codes will appear here (stored locally in your browser).
        </p>
      </section>
    );
  }

  return (
    <section id="history" aria-labelledby="history-heading">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2
            id="history-heading"
            className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl"
          >
            Recent QR Codes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Stored in your browser — up to 24 items
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="self-start shrink-0">
          <Trash2 className="h-4 w-4" />
          Clear all
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        {history.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              type="button"
              onClick={() => onRestore(item)}
              className="block w-full p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={`Restore QR code for ${item.displayLabel}`}
            >
              <img
                src={item.thumbnail}
                alt=""
                className="mx-auto mb-2 h-20 w-20 object-contain"
              />
              <span className="mb-0.5 block text-xs font-medium text-brand-600 dark:text-brand-400">
                {CONTENT_TYPE_LABELS[item.contentType]}
              </span>
              <span className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
                {item.displayLabel}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="absolute right-1 top-1 rounded-full bg-white/90 p-1.5 opacity-100 shadow sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 dark:bg-slate-900/90"
              aria-label={`Remove ${item.displayLabel} from history`}
            >
              <X className="h-3.5 w-3.5 text-slate-500" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
