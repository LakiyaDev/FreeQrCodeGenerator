import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Camera,
  CameraOff,
  Copy,
  Check,
  ExternalLink,
  ImageUp,
  ScanLine,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/share';

const SCANNER_CONFIG = {
  fps: 10,
  qrbox: { width: 260, height: 260 },
  aspectRatio: 1,
};

/** Shared square viewport — keeps scanner and result panels matched. */
const PANEL_VIEWPORT_CLASS =
  'relative aspect-square w-full overflow-hidden rounded-xl';

function isUrl(text: string): boolean {
  try {
    const url = /^https?:\/\//i.test(text) ? text : `https://${text}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function normalizeUrl(text: string): string {
  return /^https?:\/\//i.test(text) ? text : `https://${text}`;
}

export function QrScannerSection() {
  const scannerRegionId = useId().replace(/:/g, '');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;

    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }
      scanner.clear();
    } catch {
      // Scanner may already be stopped
    } finally {
      scannerRef.current = null;
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      void stopScanner();
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, [stopScanner]);

  const handleScanSuccess = useCallback(
    async (decodedText: string) => {
      setResult(decodedText);
      setError(null);
      await stopScanner();
    },
    [stopScanner],
  );

  const startScanner = async () => {
    setError(null);
    setResult(null);

    try {
      await stopScanner();

      const scanner = new Html5Qrcode(scannerRegionId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        SCANNER_CONFIG,
        (text) => {
          void handleScanSuccess(text);
        },
        () => {
          // No QR in frame — ignore per-frame errors
        },
      );

      setIsScanning(true);
    } catch {
      setError(
        'Could not access the camera. Allow camera permission or upload a QR image instead.',
      );
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc.).');
      return;
    }

    setIsProcessingFile(true);
    setError(null);

    try {
      await stopScanner();
      const scanner = new Html5Qrcode(scannerRegionId, { verbose: false });
      const decoded = await scanner.scanFile(file, true);
      setResult(decoded);
      scanner.clear();
    } catch {
      setError('No QR code found in that image. Try another photo with a clear code.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const ok = await copyToClipboard(result);
    if (ok) {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
      setCopied(true);
      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copiedTimeoutRef.current = null;
      }, 2000);
    }
  };

  const handleScanAgain = () => {
    setResult(null);
    setError(null);
  };

  const showOpenLink = result && isUrl(result);

  return (
    <section
      id="qr-scanner"
      aria-labelledby="qr-scanner-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <ScanLine className="h-3.5 w-3.5" aria-hidden />
            Built-in scanner
          </span>
          <h2
            id="qr-scanner-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Scan a QR code
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Use your device camera to read any QR code instantly, or upload a photo
            containing a code. Works entirely in your browser — nothing is uploaded to a server.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Scanner panel */}
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold text-slate-900">QR scanner</h3>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div
                className={[
                  PANEL_VIEWPORT_CLASS,
                  isScanning ? 'bg-slate-900' : 'border-2 border-brand-200 bg-brand-50',
                ].join(' ')}
              >
                <div
                  id={scannerRegionId}
                  className={isScanning ? 'h-full w-full [&>video]:!h-full [&>video]:!w-full [&>video]:!object-cover' : 'hidden'}
                />
                {!isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <ScanLine className="h-14 w-14 text-brand-300" aria-hidden />
                    <p className="text-sm font-medium text-brand-800">
                      Start the camera or upload an image to scan a QR code
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="mb-3 text-center text-xs font-medium text-indigo-800">
                  Scan with camera or upload a photo
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {!isScanning ? (
                    <Button
                      fullWidth
                      className="min-h-11"
                      onClick={() => void startScanner()}
                    >
                      <Camera className="h-4 w-4 shrink-0" />
                      Start camera
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      fullWidth
                      className="min-h-11 bg-white"
                      onClick={() => void stopScanner()}
                    >
                      <CameraOff className="h-4 w-4 shrink-0" />
                      Stop camera
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    fullWidth
                    className="min-h-11 bg-white"
                    disabled={isProcessingFile}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageUp className="h-4 w-4 shrink-0" />
                    {isProcessingFile ? 'Scanning…' : 'Upload image'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => void handleFileUpload(e)}
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Result panel — matched width & viewport height */}
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold text-slate-900">Scan result</h3>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div
                className={[
                  PANEL_VIEWPORT_CLASS,
                  result
                    ? 'border border-slate-200 bg-slate-50'
                    : 'border-2 border-dashed border-slate-200 bg-slate-50',
                ].join(' ')}
              >
                {!result ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <p className="text-sm text-slate-500">
                      Scanned content will appear here — URLs, text, phone numbers, Wi-Fi
                      credentials, and more.
                    </p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col p-4 sm:p-5">
                    <p className="flex-1 overflow-y-auto break-all text-sm font-medium leading-relaxed text-slate-900">
                      {result}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100 p-4">
                {result ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="secondary"
                        fullWidth
                        className="min-h-11 bg-white"
                        onClick={() => void handleCopy()}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 shrink-0 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 shrink-0" />
                            Copy
                          </>
                        )}
                      </Button>
                      {showOpenLink ? (
                        <Button
                          fullWidth
                          className="min-h-11"
                          onClick={() =>
                            window.open(normalizeUrl(result), '_blank', 'noopener,noreferrer')
                          }
                        >
                          <ExternalLink className="h-4 w-4 shrink-0" />
                          Open link
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          fullWidth
                          className="min-h-11 bg-white"
                          onClick={handleScanAgain}
                        >
                          Scan again
                        </Button>
                      )}
                    </div>
                    {showOpenLink && (
                      <Button variant="ghost" fullWidth className="min-h-11" onClick={handleScanAgain}>
                        Scan another code
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" fullWidth disabled className="min-h-11 bg-white opacity-50">
                      <Copy className="h-4 w-4 shrink-0" />
                      Copy
                    </Button>
                    <Button variant="secondary" fullWidth disabled className="min-h-11 bg-white opacity-50">
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      Open link
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
