import { useEffect, useRef } from 'react';
import { QrCode } from 'lucide-react';
import { createQrStyling, updateQrStyling } from '@/lib/qrGenerator';
import { compositeQrWithFrame } from '@/lib/download';
import type { QrCustomization } from '@/types';
import type QRCodeStyling from 'qr-code-styling';

export interface QrCanvasPair {
  raw: HTMLCanvasElement;
  framed: HTMLCanvasElement;
}

interface QrPreviewProps {
  encodedValue: string | null;
  customization: QrCustomization;
  onCanvasReady?: (canvases: QrCanvasPair | null) => void;
}

/** Shared preview width — keeps placeholder and generated QR aligned. */
const PREVIEW_CLASS = 'mx-auto w-full max-w-[320px]';

/** Live QR preview with optional decorative frame overlay. */
export function QrPreview({
  encodedValue,
  customization,
  onCanvasReady,
}: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const onCanvasReadyRef = useRef(onCanvasReady);
  onCanvasReadyRef.current = onCanvasReady;

  useEffect(() => {
    if (!encodedValue || !containerRef.current) {
      onCanvasReadyRef.current?.(null);
      return;
    }

    const container = containerRef.current;

    if (!qrRef.current) {
      qrRef.current = createQrStyling(encodedValue, customization);
      container.innerHTML = '';
      qrRef.current.append(container);
    } else {
      updateQrStyling(qrRef.current, encodedValue, customization);
    }

    const timer = window.setTimeout(() => {
      const rawCanvas = container.querySelector('canvas');
      if (!rawCanvas) {
        onCanvasReadyRef.current?.(null);
        return;
      }

      const framed = compositeQrWithFrame(
        rawCanvas,
        customization.frameStyle,
        customization.foregroundColor,
        customization.backgroundColor,
      );

      onCanvasReadyRef.current?.({ raw: rawCanvas, framed });

      const frameCanvas = frameCanvasRef.current;
      if (frameCanvas) {
        frameCanvas.width = framed.width;
        frameCanvas.height = framed.height;
        const ctx = frameCanvas.getContext('2d');
        ctx?.clearRect(0, 0, framed.width, framed.height);
        ctx?.drawImage(framed, 0, 0);
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [encodedValue, customization]);

  if (!encodedValue) {
    return (
      <div className={`${PREVIEW_CLASS} flex flex-col items-center`}>
        <div
          className="flex aspect-square w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4"
          aria-label="QR code preview placeholder"
        >
          <QrCode className="mb-3 h-16 w-16 text-slate-300" />
          <p className="text-center text-sm text-slate-500">
            Enter content to preview your QR code
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${PREVIEW_CLASS} flex flex-col items-center`}>
      <div className="flex w-full justify-center rounded-2xl bg-white p-4 shadow-card">
        <div ref={containerRef} className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden />
        <canvas
          ref={frameCanvasRef}
          className="mx-auto max-w-full rounded-lg"
          role="img"
          aria-label="Generated QR code preview"
        />
      </div>
    </div>
  );
}
