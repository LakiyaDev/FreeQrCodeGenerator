import { jsPDF } from 'jspdf';
import type { FrameStyle } from '@/types';
import { sanitizeFilename } from './qrEncoder';

const BANNER_HEIGHT = 36;

/** Frame layout metadata used when compositing exports. */
interface FrameLayout {
  padding: number;
  bannerHeight: number;
  borderRadius: number;
  borderWidth: number;
  showBanner: boolean;
  bannerText: string;
}

function getFrameLayout(style: FrameStyle): FrameLayout {
  switch (style) {
    case 'simple':
      return {
        padding: 16,
        bannerHeight: 0,
        borderRadius: 0,
        borderWidth: 3,
        showBanner: false,
        bannerText: '',
      };
    case 'rounded':
      return {
        padding: 20,
        bannerHeight: 0,
        borderRadius: 16,
        borderWidth: 3,
        showBanner: false,
        bannerText: '',
      };
    case 'corners':
      return {
        padding: 28,
        bannerHeight: 0,
        borderRadius: 0,
        borderWidth: 0,
        showBanner: false,
        bannerText: '',
      };
    case 'scan-me':
      return {
        padding: 24,
        bannerHeight: BANNER_HEIGHT,
        borderRadius: 0,
        borderWidth: 0,
        showBanner: true,
        bannerText: 'SCAN ME!',
      };
    case 'banner':
      return {
        padding: 20,
        bannerHeight: 32,
        borderRadius: 8,
        borderWidth: 2,
        showBanner: true,
        bannerText: 'SCAN ME',
      };
    default:
      return {
        padding: 0,
        bannerHeight: 0,
        borderRadius: 0,
        borderWidth: 0,
        showBanner: false,
        bannerText: '',
      };
  }
}

/** Draw decorative frame around QR on canvas context. */
function drawFrameOnCanvas(
  ctx: CanvasRenderingContext2D,
  qrSize: number,
  style: FrameStyle,
  fgColor: string,
  bgColor: string,
): { width: number; height: number; offsetX: number; offsetY: number } {
  const layout = getFrameLayout(style);
  const totalWidth = qrSize + layout.padding * 2;
  const totalHeight =
    qrSize + layout.padding * 2 + (layout.showBanner ? layout.bannerHeight + 8 : 0);

  ctx.fillStyle = bgColor;
  if (layout.borderRadius > 0) {
    roundRect(ctx, 0, 0, totalWidth, totalHeight, layout.borderRadius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, totalWidth, totalHeight);
  }

  if (layout.borderWidth > 0) {
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = layout.borderWidth;
    if (layout.borderRadius > 0) {
      roundRect(
        ctx,
        layout.borderWidth / 2,
        layout.borderWidth / 2,
        totalWidth - layout.borderWidth,
        totalHeight - layout.borderWidth,
        layout.borderRadius,
      );
      ctx.stroke();
    } else {
      ctx.strokeRect(
        layout.borderWidth / 2,
        layout.borderWidth / 2,
        totalWidth - layout.borderWidth,
        totalHeight - layout.borderWidth,
      );
    }
  }

  if (style === 'corners') {
    const len = 20;
    const inset = layout.padding - 8;
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 4;
    const corners: [number, number, number, number][] = [
      [inset, inset, 1, 1],
      [totalWidth - inset, inset, -1, 1],
      [inset, totalHeight - inset, 1, -1],
      [totalWidth - inset, totalHeight - inset, -1, -1],
    ];
    for (const [x, y, dx, dy] of corners) {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * len);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * len, y);
      ctx.stroke();
    }
  }

  if (layout.showBanner) {
    const bannerY = qrSize + layout.padding + 8;
    const bannerW = Math.min(qrSize * 0.7, 160);
    const bannerX = (totalWidth - bannerW) / 2;

    ctx.fillStyle = fgColor;
    if (style === 'scan-me') {
      roundRect(ctx, bannerX, bannerY, bannerW, layout.bannerHeight, 8);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(totalWidth / 2 - 8, bannerY);
      ctx.lineTo(totalWidth / 2, bannerY - 8);
      ctx.lineTo(totalWidth / 2 + 8, bannerY);
      ctx.fill();
    } else {
      ctx.fillRect(bannerX, bannerY, bannerW, layout.bannerHeight);
    }

    ctx.fillStyle = bgColor;
    ctx.font = 'bold 14px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      layout.bannerText,
      totalWidth / 2,
      bannerY + layout.bannerHeight / 2,
    );
  }

  return {
    width: totalWidth,
    height: totalHeight,
    offsetX: layout.padding,
    offsetY: layout.padding,
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Composite QR canvas with optional frame into a single export canvas. */
export function compositeQrWithFrame(
  qrCanvas: HTMLCanvasElement,
  frameStyle: FrameStyle,
  fgColor: string,
  bgColor: string,
): HTMLCanvasElement {
  const layout = getFrameLayout(frameStyle);
  const qrSize = qrCanvas.width;
  const totalWidth = qrSize + layout.padding * 2;
  const totalHeight =
    qrSize + layout.padding * 2 + (layout.showBanner ? layout.bannerHeight + 8 : 0);

  const output = document.createElement('canvas');
  output.width = totalWidth;
  output.height = totalHeight;
  const ctx = output.getContext('2d');
  if (!ctx) return qrCanvas;

  if (frameStyle === 'none') {
    ctx.drawImage(qrCanvas, 0, 0);
    return output;
  }

  const { offsetX, offsetY } = drawFrameOnCanvas(
    ctx,
    qrSize,
    frameStyle,
    fgColor,
    bgColor,
  );
  ctx.drawImage(qrCanvas, offsetX, offsetY);

  return output;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Export composited canvas as PNG or JPG. */
export async function downloadRaster(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg',
  filename: string,
): Promise<void> {
  const mime = format === 'png' ? 'image/png' : 'image/jpeg';
  const quality = format === 'jpg' ? 0.92 : undefined;
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, quality),
  );
  if (!blob) throw new Error('Failed to create image.');
  downloadBlob(blob, `${sanitizeFilename(filename)}.${format}`);
}

/** Export as SVG string with embedded raster (frame included). */
export async function downloadSvg(
  qrCanvas: HTMLCanvasElement,
  frameStyle: FrameStyle,
  fgColor: string,
  bgColor: string,
  filename: string,
): Promise<void> {
  const composited = compositeQrWithFrame(qrCanvas, frameStyle, fgColor, bgColor);
  const dataUrl = composited.toDataURL('image/png');
  const w = composited.width;
  const h = composited.height;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image href="${dataUrl}" width="${w}" height="${h}"/>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, `${sanitizeFilename(filename)}.svg`);
}

/** Export as PDF with QR centered on page. */
export async function downloadPdf(
  canvas: HTMLCanvasElement,
  filename: string,
): Promise<void> {
  const imgData = canvas.toDataURL('image/png');
  const pxToMm = 0.264583;
  const widthMm = canvas.width * pxToMm;
  const heightMm = canvas.height * pxToMm;

  const pdf = new jsPDF({
    orientation: widthMm > heightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm + 20, heightMm + 20],
  });

  pdf.addImage(imgData, 'PNG', 10, 10, widthMm, heightMm);
  pdf.save(`${sanitizeFilename(filename)}.pdf`);
}

/** Create a small thumbnail for history storage. */
export async function createThumbnail(
  canvas: HTMLCanvasElement,
  maxSize = 120,
): Promise<string> {
  const scale = maxSize / Math.max(canvas.width, canvas.height);
  const thumb = document.createElement('canvas');
  thumb.width = Math.round(canvas.width * scale);
  thumb.height = Math.round(canvas.height * scale);
  const ctx = thumb.getContext('2d');
  if (!ctx) return canvas.toDataURL('image/png');
  ctx.drawImage(canvas, 0, 0, thumb.width, thumb.height);
  return thumb.toDataURL('image/png', 0.8);
}
