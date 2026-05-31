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
    <div className="grid w-full grid-cols-2 gap-3">
      <Button
        variant="secondary"
        fullWidth
        disabled={!encodedValue || disabled}
        onClick={handleCopy}
        aria-label="Copy encoded content"
        className="min-h-12 px-3 text-sm"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 shrink-0 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 shrink-0" />
            Copy Content
          </>
        )}
      </Button>
      <Button
        variant="secondary"
        fullWidth
        onClick={onGenerateNew}
        className="min-h-12 px-3 text-sm"
      >
        <RotateCcw className="h-4 w-4 shrink-0" />
        Generate New QR
      </Button>
    </div>
  );
}
