import { Copy, Check, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/share';

interface ActionButtonsProps {
  encodedValue: string | null;
  onGenerateNew: () => void;
  disabled?: boolean;
}

export function ActionButtons({
  encodedValue,
  onGenerateNew,
  disabled,
}: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!encodedValue) return;
    const ok = await copyToClipboard(encodedValue);
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

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <Button
        variant="secondary"
        fullWidth
        disabled={!encodedValue || disabled}
        onClick={handleCopy}
        aria-label="Copy encoded content"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Content
          </>
        )}
      </Button>
      <Button variant="secondary" fullWidth onClick={onGenerateNew}>
        <RotateCcw className="h-4 w-4" />
        Generate New QR
      </Button>
    </div>
  );
}
