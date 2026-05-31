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
  whatsapp: <MessageCircle className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  telegram: <Send className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
};

export function ShareButtons({
  encodedValue,
  displayLabel,
  qrCanvas,
  filename,
  disabled,
}: ShareButtonsProps) {
  const shareText = `Check out this QR code for "${displayLabel}": ${encodedValue}`;

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

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
        Share QR code
      </p>
      <div className="flex flex-wrap gap-2">
        {'share' in navigator && (
          <Button
            variant="secondary"
            size="sm"
            disabled={disabled || !qrCanvas}
            onClick={handleNativeShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
        {SHARE_PLATFORMS.map((platform) => (
          <Button
            key={platform.id}
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={() =>
              openShareWindow(platform.getShareUrl(shareText, encodedValue))
            }
            aria-label={`Share on ${platform.label}`}
          >
            {ICONS[platform.id]}
            <span className="hidden sm:inline">{platform.label}</span>
          </Button>
        ))}
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={handleInstagram}
          aria-label="Share on Instagram"
        >
          <Instagram className="h-4 w-4" />
          <span className="hidden sm:inline">Instagram</span>
        </Button>
      </div>
    </div>
  );
}
