/** Supported QR content types — each encodes data directly (static, non-expiring). */
export type ContentType = 'url' | 'text' | 'phone' | 'email' | 'wifi';

/** Error correction levels per QR spec. Higher = more redundancy, larger code. */
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/** Visual frame styles around the QR code. */
export type FrameStyle =
  | 'none'
  | 'simple'
  | 'rounded'
  | 'corners'
  | 'scan-me'
  | 'banner';

/** Download / export formats. */
export type DownloadFormat = 'png' | 'svg' | 'pdf' | 'jpg';

/** Wi-Fi encryption types for WIFI: QR payload. */
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

/** Form field values per content type. */
export interface UrlContent {
  url: string;
}

export interface TextContent {
  text: string;
}

export interface PhoneContent {
  phone: string;
}

export interface EmailContent {
  email: string;
  subject: string;
  body: string;
}

export interface WifiContent {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export type ContentData =
  | { type: 'url'; data: UrlContent }
  | { type: 'text'; data: TextContent }
  | { type: 'phone'; data: PhoneContent }
  | { type: 'email'; data: EmailContent }
  | { type: 'wifi'; data: WifiContent };

/** QR visual customization options. */
export interface QrCustomization {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  frameStyle: FrameStyle;
  logoDataUrl: string | null;
  logoSize: number;
}

/** A saved entry in localStorage history. */
export interface QrHistoryItem {
  id: string;
  contentType: ContentType;
  encodedValue: string;
  displayLabel: string;
  customization: QrCustomization;
  createdAt: number;
  /** Thumbnail as data URL for quick preview in history grid. */
  thumbnail: string;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export const DEFAULT_CUSTOMIZATION: QrCustomization = {
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  size: 280,
  errorCorrectionLevel: 'M',
  frameStyle: 'none',
  logoDataUrl: null,
  logoSize: 0.25,
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  url: 'URL',
  text: 'Text',
  phone: 'Phone',
  email: 'Email',
  wifi: 'Wi-Fi',
};

export const ERROR_CORRECTION_OPTIONS: {
  value: ErrorCorrectionLevel;
  label: string;
  description: string;
}[] = [
  { value: 'L', label: 'Low (7%)', description: 'Best for clean scans' },
  { value: 'M', label: 'Medium (15%)', description: 'Recommended default' },
  { value: 'Q', label: 'Quartile (25%)', description: 'Good with logos' },
  { value: 'H', label: 'High (30%)', description: 'Best with large logos' },
];

export const FRAME_OPTIONS: { value: FrameStyle; label: string }[] = [
  { value: 'none', label: 'No frame' },
  { value: 'simple', label: 'Simple border' },
  { value: 'rounded', label: 'Rounded border' },
  { value: 'corners', label: 'Corner brackets' },
  { value: 'scan-me', label: 'Scan Me bubble' },
  { value: 'banner', label: 'Bottom banner' },
];
