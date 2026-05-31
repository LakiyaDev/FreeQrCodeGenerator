import { Frame, ImagePlus, Palette, Sliders } from 'lucide-react';
import { AccordionItem } from '@/components/ui/Accordion';
import type { QrCustomization, FrameStyle } from '@/types';
import { ERROR_CORRECTION_OPTIONS, FRAME_OPTIONS } from '@/types';

interface CustomizationPanelProps {
  customization: QrCustomization;
  onChange: (updates: Partial<QrCustomization>) => void;
}

export function CustomizationPanel({
  customization,
  onChange,
}: CustomizationPanelProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <AccordionItem
        title="Frame"
        icon={<Frame className="h-4 w-4 text-brand-600" />}
        defaultOpen
      >
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Add a border style around your code.
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
          {FRAME_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ frameStyle: value as FrameStyle })}
              aria-pressed={customization.frameStyle === value}
              className={[
                'rounded-lg border px-2 py-3 text-xs font-medium transition-colors',
                customization.frameStyle === value
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-600 dark:text-slate-300',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title="Customize"
        icon={<Palette className="h-4 w-4 text-brand-600" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Foreground"
              value={customization.foregroundColor}
              onChange={(v) => onChange({ foregroundColor: v })}
            />
            <ColorPicker
              label="Background"
              value={customization.backgroundColor}
              onChange={(v) => onChange({ backgroundColor: v })}
            />
          </div>
          <div>
            <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>QR size</span>
              <span className="text-brand-600">{customization.size}px</span>
            </label>
            <input
              type="range"
              min={180}
              max={512}
              step={8}
              value={customization.size}
              onChange={(e) => onChange({ size: Number(e.target.value) })}
              className="w-full accent-brand-600"
              aria-label="QR code size"
            />
          </div>
          <div>
            <label
              htmlFor="error-correction"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Error correction
            </label>
            <select
              id="error-correction"
              value={customization.errorCorrectionLevel}
              onChange={(e) =>
                onChange({
                  errorCorrectionLevel: e.target
                    .value as QrCustomization['errorCorrectionLevel'],
                })
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
            >
              {ERROR_CORRECTION_OPTIONS.map(({ value, label, description }) => (
                <option key={value} value={value}>
                  {label} — {description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Logo"
        icon={<ImagePlus className="h-4 w-4 text-brand-600" />}
      >
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Add a logo in the center. Use High error correction for best results.
        </p>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 transition-colors hover:border-brand-400 hover:bg-brand-50/50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500">
            <ImagePlus className="h-5 w-5" />
            Upload logo (max 2 MB)
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogoUpload}
            />
          </label>
          {customization.logoDataUrl && (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={customization.logoDataUrl}
                  alt="Uploaded logo preview"
                  className="h-12 w-12 rounded-lg border object-contain dark:border-slate-600"
                />
                <button
                  type="button"
                  onClick={() => onChange({ logoDataUrl: null })}
                  className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  Remove logo
                </button>
              </div>
              <div>
                <label className="mb-1.5 flex justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span className="flex items-center gap-1">
                    <Sliders className="h-3.5 w-3.5" />
                    Logo size
                  </span>
                  <span>{Math.round(customization.logoSize * 100)}%</span>
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={0.4}
                  step={0.05}
                  value={customization.logoSize}
                  onChange={(e) =>
                    onChange({ logoSize: Number(e.target.value) })
                  }
                  className="w-full accent-brand-600"
                  aria-label="Logo size"
                />
              </div>
            </>
          )}
        </div>
      </AccordionItem>
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-2 py-2 text-sm uppercase dark:border-slate-600 dark:bg-slate-800"
          pattern="^#[0-9A-Fa-f]{6}$"
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
}
