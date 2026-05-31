import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, Globe } from 'lucide-react';
import { ContentTypeSelector } from '@/components/generator/ContentTypeSelector';
import { ContentForm } from '@/components/generator/ContentForm';
import { CustomizationPanel } from '@/components/generator/CustomizationPanel';
import { QrPreview, type QrCanvasPair } from '@/components/generator/QrPreview';
import { DownloadMenu } from '@/components/actions/DownloadMenu';
import { ShareButtons } from '@/components/actions/ShareButtons';
import { ActionButtons } from '@/components/actions/ActionButtons';
import { Button } from '@/components/ui/Button';
import {
  encodeQrContent,
  getDefaultContentData,
  getDisplayLabel,
  validateContent,
} from '@/lib/qrEncoder';
import { createThumbnail } from '@/lib/download';
import { createHistoryId } from '@/lib/history';
import { getDefaultDownloadFilename } from '@/lib/share';
import { useQrHistoryContext } from '@/context/QrHistoryContext';
import type {
  ContentData,
  ContentType,
  QrCustomization,
  QrHistoryItem,
} from '@/types';
import { DEFAULT_CUSTOMIZATION } from '@/types';

export function QrGenerator() {
  const { addItem } = useQrHistoryContext();

  const [contentType, setContentType] = useState<ContentType>('url');
  const [content, setContent] = useState<ContentData>(() =>
    getDefaultContentData('url'),
  );
  const [customization, setCustomization] =
    useState<QrCustomization>(DEFAULT_CUSTOMIZATION);
  const [encodedValue, setEncodedValue] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [canvases, setCanvases] = useState<QrCanvasPair | null>(null);
  const shouldSaveHistory = useRef(false);
  const lastSavedEncoded = useRef<string | null>(null);

  // Restore from sessionStorage when user clicks history item
  useEffect(() => {
    const raw = sessionStorage.getItem('qr-restore');
    if (!raw) return;
    sessionStorage.removeItem('qr-restore');
    try {
      const item = JSON.parse(raw) as QrHistoryItem;
      setContentType(item.contentType);
      setCustomization(item.customization);
      setEncodedValue(item.encodedValue);
      shouldSaveHistory.current = false;
      lastSavedEncoded.current = item.encodedValue;

      // Rebuild content form from encoded value (best-effort per type)
      setContent(rebuildContentFromHistory(item));
    } catch {
      // Invalid restore payload
    }
  }, []);

  const displayLabel = useMemo(() => {
    if (!encodedValue) return '';
    return getDisplayLabel(content);
  }, [content, encodedValue]);

  const handleTypeChange = (type: ContentType) => {
    setContentType(type);
    setContent(getDefaultContentData(type));
    setValidationError(null);
    setEncodedValue(null);
    setCanvases(null);
    shouldSaveHistory.current = false;
  };

  const handleCustomizationChange = (updates: Partial<QrCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = useCallback(() => {
    const validation = validateContent(content);
    if (!validation.valid) {
      setValidationError(validation.message ?? 'Invalid input.');
      setEncodedValue(null);
      setCanvases(null);
      return;
    }

    setValidationError(null);
    const encoded = encodeQrContent(content);
    setEncodedValue(encoded);
    shouldSaveHistory.current = true;
  }, [content]);

  const handleCanvasReady = useCallback(
    async (pair: QrCanvasPair | null) => {
      setCanvases(pair);
      if (!pair || !encodedValue || !shouldSaveHistory.current) return;
      if (lastSavedEncoded.current === encodedValue) return;

      try {
        const thumbnail = await createThumbnail(pair.framed);
        const item: QrHistoryItem = {
          id: createHistoryId(),
          contentType: content.type,
          encodedValue,
          displayLabel: getDisplayLabel(content),
          customization: { ...customization },
          createdAt: Date.now(),
          thumbnail,
        };
        addItem(item);
        lastSavedEncoded.current = encodedValue;
        shouldSaveHistory.current = false;
      } catch {
        // Skip history on thumbnail failure
      }
    },
    [encodedValue, content, customization, addItem],
  );

  const handleGenerateNew = () => {
    setContent(getDefaultContentData(contentType));
    setEncodedValue(null);
    setValidationError(null);
    setCanvases(null);
    setCustomization({ ...DEFAULT_CUSTOMIZATION });
    shouldSaveHistory.current = false;
    lastSavedEncoded.current = null;
  };

  const filename = getDefaultDownloadFilename(displayLabel || 'qr-code');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <ContentTypeSelector selected={contentType} onSelect={handleTypeChange} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-800/50 dark:shadow-card-dark">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
              <Globe className="h-5 w-5 text-brand-600" />
              Complete the content
            </h2>
            <ContentForm
              content={content}
              onChange={setContent}
              fieldError={validationError ?? undefined}
            />
            {validationError && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {validationError}
              </div>
            )}
            <Button fullWidth className="mt-6" size="lg" onClick={handleGenerate}>
              {encodedValue ? 'Update QR Code' : 'Generate QR Code'}
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-800/50 dark:shadow-card-dark">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Design your QR code
            </h2>
            <CustomizationPanel
              customization={customization}
              onChange={handleCustomizationChange}
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex w-full flex-col">
              <div className="mx-auto w-full max-w-[320px]">
                <QrPreview
                  encodedValue={encodedValue}
                  customization={customization}
                  onCanvasReady={handleCanvasReady}
                />
              </div>

              <div className="mt-6 w-full space-y-3">
                <DownloadMenu
                  canvases={canvases}
                  customization={customization}
                  displayLabel={displayLabel}
                  disabled={!encodedValue}
                />
                <ActionButtons
                  encodedValue={encodedValue}
                  onGenerateNew={handleGenerateNew}
                />
                {encodedValue && (
                  <ShareButtons
                    encodedValue={encodedValue}
                    displayLabel={displayLabel}
                    qrCanvas={canvases?.framed ?? null}
                    filename={filename}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Rebuild form state from a history item for restore. */
function rebuildContentFromHistory(item: QrHistoryItem): ContentData {
  const { contentType, encodedValue } = item;
  switch (contentType) {
    case 'url':
      return {
        type: 'url',
        data: { url: encodedValue.replace(/^https?:\/\//i, '') },
      };
    case 'text':
      return { type: 'text', data: { text: encodedValue } };
    case 'phone':
      return {
        type: 'phone',
        data: { phone: encodedValue.replace(/^tel:/i, '') },
      };
    case 'email': {
      const mailto = encodedValue.replace(/^mailto:/i, '');
      const [email, query] = mailto.split('?');
      const params = new URLSearchParams(query);
      return {
        type: 'email',
        data: {
          email,
          subject: params.get('subject') ?? '',
          body: params.get('body') ?? '',
        },
      };
    }
    case 'wifi': {
      const ssid = encodedValue.match(/S:([^;]*)/)?.[1]?.replace(/\\(.)/g, '$1') ?? '';
      const password = encodedValue.match(/P:([^;]*)/)?.[1]?.replace(/\\(.)/g, '$1') ?? '';
      const enc = (encodedValue.match(/T:([^;]*)/)?.[1] ?? 'WPA') as 'WPA' | 'WEP' | 'nopass';
      const hidden = encodedValue.includes('H:true');
      return {
        type: 'wifi',
        data: { ssid, password, encryption: enc, hidden },
      };
    }
    default:
      return getDefaultContentData(contentType);
  }
}
