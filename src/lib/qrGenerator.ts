import QRCodeStyling from 'qr-code-styling';
import type { Options } from 'qr-code-styling';
import type { QrCustomization } from '@/types';

/** Create a configured QRCodeStyling instance (client-side only). */
export function createQrStyling(
  data: string,
  customization: QrCustomization,
): QRCodeStyling {
  const options: Options = {
    width: customization.size,
    height: customization.size,
    type: 'canvas',
    data,
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: customization.errorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: customization.logoSize,
      margin: 4,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: customization.foregroundColor,
      type: 'rounded',
    },
    backgroundOptions: {
      color: customization.backgroundColor,
    },
    cornersSquareOptions: {
      color: customization.foregroundColor,
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: customization.foregroundColor,
      type: 'dot',
    },
    image: customization.logoDataUrl ?? undefined,
  };

  return new QRCodeStyling(options);
}

/** Update an existing instance when options change. */
export function updateQrStyling(
  qr: QRCodeStyling,
  data: string,
  customization: QrCustomization,
): void {
  qr.update({
    data,
    width: customization.size,
    height: customization.size,
    qrOptions: {
      errorCorrectionLevel: customization.errorCorrectionLevel,
    },
    image: customization.logoDataUrl ?? undefined,
    imageOptions: {
      imageSize: customization.logoSize,
    },
    dotsOptions: { color: customization.foregroundColor },
    backgroundOptions: { color: customization.backgroundColor },
    cornersSquareOptions: { color: customization.foregroundColor },
    cornersDotOptions: { color: customization.foregroundColor },
  });
}

/** Render QR to a canvas element and return the canvas. */
export async function renderQrToCanvas(
  data: string,
  customization: QrCustomization,
): Promise<HTMLCanvasElement> {
  const qr = createQrStyling(data, customization);
  const canvas = document.createElement('canvas');
  await qr.append(canvas);
  return canvas;
}

/** Get raw canvas from QRCodeStyling instance. */
export async function getQrCanvas(
  qr: QRCodeStyling,
): Promise<HTMLCanvasElement | null> {
  const raw = await qr.getRawData('png');
  if (!raw || !(raw instanceof Blob)) return null;
  const bitmap = await createImageBitmap(raw);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvas;
}
