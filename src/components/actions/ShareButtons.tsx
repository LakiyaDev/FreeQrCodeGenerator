import {
  Share2,
  MessageCircle,
  Facebook,
  Linkedin,
  Twitter,
  Send,
  Mail,
  Instagram,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  INSTAGRAM_NOTE,
  openShareWindow,
  shareQrImage,
  SHARE_PLATFORMS,
} from '@/lib/share';

interface ShareButtonsProps {
  encodedValue: string;
  displayLabel: string;
  qrCanvas: HTMLCanvasElement | null;
  filename: string;
  disabled?: boolean;
}

const ICONS: Record<string, React.ReactNode> = {
  share: <Share2 className="h-4 w-4 shrink-0" />,
  whatsapp: <MessageCircle className="h-4 w-4 shrink-0" />,
  facebook: <Facebook className="h-4 w-4 shrink-0" />,
  twitter: <Twitter className="h-4 w-4 shrink-0" />,
  linkedin: <Linkedin className="h-4 w-4 shrink-0" />,
  telegram: <Send className="h-4 w-4 shrink-0" />,
  email: <Mail className="h-4 w-4 shrink-0" />,
  instagram: <Instagram className="h-4 w-4 shrink-0" />,
};

export function ShareButtons({
  encodedValue,
  displayLabel,
  qrCanvas,
  filename,
  disabled,
}: ShareButtonsProps) {
  const shareText = `Check out this QR code for "${displayLabel}": ${encodedValue}`;
  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  const handleNativeShare = async () => {
    if (!qrCanvas) return;
    const shared = await shareQrImage(qrCanvas, filename, shareText);
    if (!shared) {
      alert('Native sharing is not supported on this device. Use the platform buttons below.');
    }
  };

  const handleInstagram = () => {
    alert(INSTAGRAM_NOTE);
  };

  const shareItems = [
    {
      id: 'share',
      label: 'Share',
      onClick: handleNativeShare,
      disabled: disabled || !qrCanvas || !canNativeShare,
    },
    ...SHARE_PLATFORMS.map((platform) => ({
      id: platform.id,
      label: platform.label,
      onClick: () => openShareWindow(platform.getShareUrl(shareText, encodedValue)),
      disabled,
    })),
    {
      id: 'instagram',
      label: 'Instagram',
      onClick: handleInstagram,
      disabled,
    },
  ];

  return (
    <div className="space-y-3 pt-1">
      <p className="text-sm font-medium text-slate-700">Share QR code</p>
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        {shareItems.map((item) => (
          <Button
            key={item.id}
            variant="secondary"
            size="sm"
            fullWidth
            disabled={item.disabled}
            onClick={item.onClick}
            aria-label={`Share on ${item.label}`}
            className="min-h-[3.25rem] flex-col gap-1 px-1 py-2 text-[11px] leading-tight sm:min-h-11 sm:flex-row sm:gap-1.5 sm:px-2 sm:text-xs"
          >
            {ICONS[item.id]}
            <span className="text-center">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
