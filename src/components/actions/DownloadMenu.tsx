import { Download, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  downloadPdf,
  downloadRaster,
  downloadSvg,
} from '@/lib/download';
import { DOWNLOAD_FORMAT_LABELS, getDefaultDownloadFilename } from '@/lib/share';
import type { DownloadFormat, QrCustomization } from '@/types';
import type { QrCanvasPair } from '@/components/generator/QrPreview';

interface DownloadMenuProps {
  canvases: QrCanvasPair | null;
  customization: QrCustomization;
  displayLabel: string;
  disabled?: boolean;
}

export function DownloadMenu({
  canvases,
  customization,
  displayLabel,
  disabled,
}: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState(() =>
    getDefaultDownloadFilename(displayLabel),
  );
  const [downloading, setDownloading] = useState<DownloadFormat | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilename(getDefaultDownloadFilename(displayLabel));
  }, [displayLabel]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleDownload = async (format: DownloadFormat) => {
    if (!canvases) return;
    setDownloading(format);
    try {
      const { raw, framed } = canvases;

      switch (format) {
        case 'png':
          await downloadRaster(framed, 'png', filename);
          break;
        case 'jpg':
          await downloadRaster(framed, 'jpg', filename);
          break;
        case 'svg':
          await downloadSvg(
            raw,
            customization.frameStyle,
            customization.foregroundColor,
            customization.backgroundColor,
            filename,
          );
          break;
        case 'pdf':
          await downloadPdf(framed, filename);
          break;
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      <Button
        fullWidth
        size="lg"
        disabled={disabled || !canvases}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="relative min-h-12 justify-center px-5"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <Download className="h-5 w-5 shrink-0" />
          Download QR Code
        </span>
        <ChevronDown
          className={`absolute right-5 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </Button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
          role="listbox"
          aria-label="Download format options"
        >
          <Input
            label="File name"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="my-qr-code"
            hint="Extension is added automatically."
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(Object.keys(DOWNLOAD_FORMAT_LABELS) as DownloadFormat[]).map(
              (format) => (
                <button
                  key={format}
                  type="button"
                  role="option"
                  disabled={downloading !== null}
                  onClick={() => handleDownload(format)}
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium transition-colors hover:border-brand-500 hover:bg-brand-50 disabled:opacity-50"
                >
                  {downloading === format ? 'Saving…' : DOWNLOAD_FORMAT_LABELS[format]}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
