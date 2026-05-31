import { Globe } from 'lucide-react';
import type { ContentType } from '@/types';
import { getContentTypeMeta } from '@/config/contentTypes';

interface PhonePreviewProps {
  previewUrl: string | null;
  contentType: ContentType;
}

export function PhonePreview({ previewUrl, contentType }: PhonePreviewProps) {
  const meta = getContentTypeMeta(contentType);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative w-full max-w-[240px] xl:max-w-[280px]">
        <div className="rounded-[2.5rem] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-2xl">
          <div className="overflow-hidden rounded-[1.75rem] bg-white">
            <div className="flex items-center justify-center bg-slate-900 py-1.5">
              <div className="h-1 w-16 rounded-full bg-slate-700" />
            </div>

            <div className="min-h-[420px] p-4">
              {previewUrl ? (
                <>
                  <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{previewUrl}</span>
                  </div>
                  <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-brand-50">
                    <Globe className="h-10 w-10 text-brand-300" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-brand-200" />
                    <div className="flex-1 space-y-1.5 pt-1">
                      <div className="h-2 w-full rounded bg-slate-100" />
                      <div className="h-2 w-2/3 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-brand-500 py-2.5 text-center text-xs font-semibold text-white">
                    Visit page
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center px-4 text-center">
                  <Globe className="mb-3 h-12 w-12 text-slate-200" />
                  <p className="text-sm text-slate-400">
                    Enter your {meta.label.toLowerCase()} content to see a preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
