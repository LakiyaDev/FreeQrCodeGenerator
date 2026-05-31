/** Supported QR content types — each encodes data directly (static, non-expiring). */
export type ContentType =
  | 'url'
  | 'vcard'
  | 'pdf'
  | 'images'
  | 'social'
  | 'video'
  | 'text'
  | 'wifi'
  | 'app'
  | 'menu'
  | 'phone'
  | 'email';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameStyle =
  | 'none'
  | 'simple'
  | 'rounded'
  | 'corners'
  | 'scan-me'
  | 'banner';

export type DownloadFormat = 'png' | 'svg' | 'pdf' | 'jpg';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface LinkContent {
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

export interface VCardContent {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  website: string;
}

export interface AppContent {
  iosUrl: string;
  androidUrl: string;
}

export type ContentData =
  | { type: 'url'; data: LinkContent }
  | { type: 'pdf'; data: LinkContent }
  | { type: 'images'; data: LinkContent }
  | { type: 'social'; data: LinkContent }
  | { type: 'video'; data: LinkContent }
  | { type: 'menu'; data: LinkContent }
  | { type: 'text'; data: TextContent }
  | { type: 'vcard'; data: VCardContent }
  | { type: 'wifi'; data: WifiContent }
  | { type: 'app'; data: AppContent }
  | { type: 'phone'; data: PhoneContent }
  | { type: 'email'; data: EmailContent };

export interface QrCustomization {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  frameStyle: FrameStyle;
  logoDataUrl: string | null;
  logoSize: number;
}

export interface QrHistoryItem {
  id: string;
  contentType: ContentType;
  encodedValue: string;
  displayLabel: string;
  customization: QrCustomization;
  createdAt: number;
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
  url: 'Website URL',
  vcard: 'vCard',
  pdf: 'PDF',
  images: 'Images',
  social: 'Social Media',
  video: 'Video',
  text: 'Simple Text',
  wifi: 'Wi-Fi',
  app: 'App',
  menu: 'Menu',
  phone: 'Phone',
  email: 'Email',
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
