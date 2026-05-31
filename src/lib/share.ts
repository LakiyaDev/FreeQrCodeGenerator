import type { DownloadFormat } from '@/types';

const HISTORY_KEY = 'free-qr-generator-history';
const MAX_HISTORY = 24;

export interface SharePlatform {
  id: string;
  label: string;
  getShareUrl: (text: string, url?: string) => string;
}

export const SHARE_PLATFORMS: SharePlatform[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    getShareUrl: (text) =>
      `https://wa.me/?text=${encodeURIComponent(text)}`,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    getShareUrl: (text, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url ?? '')}&quote=${encodeURIComponent(text)}`,
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    getShareUrl: (text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    getShareUrl: (text, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url ?? '')}&summary=${encodeURIComponent(text)}`,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    getShareUrl: (text) =>
      `https://t.me/share/url?text=${encodeURIComponent(text)}`,
  },
  {
    id: 'email',
    label: 'Email',
    getShareUrl: (text) =>
      `mailto:?subject=${encodeURIComponent('Check out this QR code')}&body=${encodeURIComponent(text)}`,
  },
];

export const INSTAGRAM_NOTE =
  'Instagram does not support direct link sharing. Download the QR code and upload it to your story or post.';

export function openShareWindow(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

export async function shareQrImage(
  canvas: HTMLCanvasElement,
  filename: string,
  text: string,
): Promise<boolean> {
  if (!navigator.share || !navigator.canShare) return false;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png'),
  );
  if (!blob) return false;

  const file = new File([blob], `${filename}.png`, { type: 'image/png' });
  const shareData: ShareData = { title: 'QR Code', text, files: [file] };

  if (!navigator.canShare(shareData)) return false;

  try {
    await navigator.share(shareData);
    return true;
  } catch {
    return false;
  }
}

export function getDefaultDownloadFilename(label: string): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return slug || 'qr-code';
}

export const DOWNLOAD_FORMAT_LABELS: Record<DownloadFormat, string> = {
  png: 'PNG',
  svg: 'SVG',
  pdf: 'PDF',
  jpg: 'JPG',
};

export { HISTORY_KEY, MAX_HISTORY };
