import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ContentForm } from '@/components/generator/ContentForm';
import { CustomizationPanel } from '@/components/generator/CustomizationPanel';
import { PhonePreview } from '@/components/generator/PhonePreview';
import { QrPreview, type QrCanvasPair } from '@/components/generator/QrPreview';
import { StepIndicator } from '@/components/generator/StepIndicator';
import { DownloadMenu } from '@/components/actions/DownloadMenu';
import { ShareButtons } from '@/components/actions/ShareButtons';
import { ActionButtons } from '@/components/actions/ActionButtons';
import { Button } from '@/components/ui/Button';
import {
  getContentTypeFromSlug,
  getContentTypeMeta,
  LINK_BASED_TYPES,
} from '@/config/contentTypes';
import {
  encodeQrContent,
  getDefaultContentData,
  getDisplayLabel,
  getPreviewUrl,
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

type WizardStep = 2 | 3;

export function CreateQrPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useQrHistoryContext();

  const contentType: ContentType | null = slug ? getContentTypeFromSlug(slug) : null;
  const meta = contentType ? getContentTypeMeta(contentType) : null;

  const [step, setStep] = useState<WizardStep>(2);
  const [content, setContent] = useState<ContentData>(() =>
    contentType ? getDefaultContentData(contentType) : getDefaultContentData('url'),
  );
  const [customization, setCustomization] =
    useState<QrCustomization>(DEFAULT_CUSTOMIZATION);
  const [encodedValue, setEncodedValue] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [canvases, setCanvases] = useState<QrCanvasPair | null>(null);
  const [nameExpanded, setNameExpanded] = useState(false);
  const [qrName, setQrName] = useState('');

  const shouldSaveHistory = useRef(false);
  const lastSavedEncoded = useRef<string | null>(null);

  useEffect(() => {
    if (!contentType) {
      navigate('/', { replace: true });
      return;
    }
    setContent(getDefaultContentData(contentType));
    setEncodedValue(null);
    setValidationError(null);
    setCanvases(null);
    setStep(2);
    setCustomization(DEFAULT_CUSTOMIZATION);
    shouldSaveHistory.current = false;
    lastSavedEncoded.current = null;
  }, [contentType, navigate]);

  useEffect(() => {
    const raw = sessionStorage.getItem('qr-restore');
    if (!raw || !contentType) return;
    sessionStorage.removeItem('qr-restore');
    try {
      const item = JSON.parse(raw) as QrHistoryItem;
      if (item.contentType !== contentType) return;
      setCustomization(item.customization);
      setEncodedValue(item.encodedValue);
      setContent(rebuildContentFromHistory(item));
      setStep(3);
      shouldSaveHistory.current = false;
      lastSavedEncoded.current = item.encodedValue;
    } catch {
      // Invalid restore payload
    }
  }, [contentType]);

  const previewUrl = useMemo(() => getPreviewUrl(content), [content]);

  const displayLabel = useMemo(() => {
    if (qrName.trim()) return qrName.trim();
    if (!encodedValue) return '';
    return getDisplayLabel(content);
  }, [content, encodedValue, qrName]);

  const handleCustomizationChange = (updates: Partial<QrCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = useCallback(() => {
    const validation = validateContent(content);
    if (!validation.valid) {
      setValidationError(validation.message ?? 'Invalid input.');
      return;
    }
    setValidationError(null);
    const encoded = encodeQrContent(content);
    setEncodedValue(encoded);
    shouldSaveHistory.current = true;
    setStep(3);
  }, [content]);

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      return;
    }
    navigate('/#choose-type');
  };

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
    if (!contentType) return;
    setContent(getDefaultContentData(contentType));
    setEncodedValue(null);
    setValidationError(null);
    setCanvases(null);
    setCustomization({ ...DEFAULT_CUSTOMIZATION });
    setQrName('');
    setStep(2);
    shouldSaveHistory.current = false;
    lastSavedEncoded.current = null;
  };

  if (!meta || !contentType) {
    return null;
  }

  const Icon = meta.icon;
  const filename = getDefaultDownloadFilename(displayLabel || 'qr-code');
  const showLinkPreview =
    LINK_BASED_TYPES.includes(contentType) ||
    contentType === 'app' ||
    (content.type === 'vcard' && content.data.website.trim().length > 0);

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-slate-50 pb-24">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/#choose-type"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            All QR types
          </Link>
          <h1 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:mt-4 sm:text-2xl lg:text-3xl">
            {step === 2
              ? `Add content to the ${meta.label} QR code`
              : `Customize your ${meta.label} QR code`}
          </h1>
        </div>

        {step === 2 && (
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_min(280px,28%)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_min(300px,26%)] xl:gap-12">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-start gap-3 border-b border-slate-100 p-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </span>
                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-900">{meta.step2Title}</h2>
                    <p className="mt-0.5 text-sm text-slate-500">{meta.step2Subtitle}</p>
                  </div>
                  <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                </div>
                <div className="p-4 sm:p-5">
                  <ContentForm
                    content={content}
                    onChange={setContent}
                    fieldError={validationError ?? undefined}
                  />
                  {validationError && (
                    <div
                      role="alert"
                      className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {validationError}
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setNameExpanded((v) => !v)}
                  className="flex w-full items-start gap-3 p-5 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <span className="text-sm font-bold text-slate-500">Aa</span>
                  </span>
                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-900">QR code name</h2>
                    <p className="mt-0.5 text-sm text-slate-500">
                      Set a name for your QR code (optional)
                    </p>
                  </div>
                  {nameExpanded ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>
                {nameExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5">
                    <input
                      type="text"
                      value={qrName}
                      onChange={(e) => setQrName(e.target.value)}
                      placeholder="My QR code"
                      className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="hidden items-center justify-center lg:flex xl:justify-end">
              {showLinkPreview ? (
                <PhonePreview previewUrl={previewUrl} contentType={contentType} />
              ) : (
                <div className="flex w-full max-w-[240px] flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm xl:max-w-[280px]">
                  <Icon className="mb-4 h-12 w-12 text-brand-400" />
                  <p className="text-sm text-slate-500">
                    Fill in your {meta.label.toLowerCase()} details on the left to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:min-h-full">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Design your QR code
              </h2>
              <CustomizationPanel
                customization={customization}
                onChange={handleCustomizationChange}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-24 lg:self-start">
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
        )}
      </div>

      {/* Bottom wizard bar */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-3 hidden min-h-10 sm:mb-0 sm:inline-flex"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back
          </Button>

          <div className="sm:flex-1">
            <StepIndicator currentStep={step} />
          </div>

          <div className="mt-3 flex items-center gap-3 sm:mt-0 sm:contents">
            <Button variant="ghost" onClick={handleBack} className="min-h-10 flex-1 sm:hidden">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              Back
            </Button>
            {step === 2 ? (
              <Button onClick={handleNext} className="min-h-10 flex-1 sm:flex-none">
                Next
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            ) : (
              <div className="hidden min-h-10 w-[88px] sm:block" aria-hidden />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function rebuildContentFromHistory(item: QrHistoryItem): ContentData {
  const { contentType, encodedValue } = item;

  if (LINK_BASED_TYPES.includes(contentType)) {
    return {
      type: contentType,
      data: { url: encodedValue.replace(/^https?:\/\//i, '') },
    } as ContentData;
  }

  switch (contentType) {
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
    case 'vcard': {
      const lines = encodedValue.split('\n');
      const get = (prefix: string) =>
        lines.find((l) => l.startsWith(prefix))?.slice(prefix.length) ?? '';
      const fn = get('FN:');
      const [firstName, ...rest] = fn.split(' ');
      return {
        type: 'vcard',
        data: {
          firstName: firstName ?? '',
          lastName: rest.join(' '),
          phone: get('TEL:'),
          email: get('EMAIL:'),
          company: get('ORG:'),
          website: get('URL:').replace(/^https?:\/\//i, ''),
        },
      };
    }
    case 'app':
      return {
        type: 'app',
        data: {
          iosUrl: encodedValue.startsWith('http') ? encodedValue : '',
          androidUrl: '',
        },
      };
    default:
      return getDefaultContentData(contentType);
  }
}
