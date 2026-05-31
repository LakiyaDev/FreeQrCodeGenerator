import type {
  ContentData,
  ContentType,
  ValidationResult,
  WifiEncryption,
} from '@/types';

/** Escape special characters in Wi-Fi QR strings per spec. */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

/** Build the raw string encoded into the QR code (static, no redirect). */
export function encodeQrContent(content: ContentData): string {
  switch (content.type) {
    case 'url': {
      let url = content.data.url.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }
      return url;
    }
    case 'text':
      return content.data.text.trim();
    case 'phone': {
      const digits = content.data.phone.replace(/[^\d+]/g, '');
      return `tel:${digits}`;
    }
    case 'email': {
      const { email, subject, body } = content.data;
      const params = new URLSearchParams();
      if (subject.trim()) params.set('subject', subject.trim());
      if (body.trim()) params.set('body', body.trim());
      const query = params.toString();
      return query ? `mailto:${email.trim()}?${query}` : `mailto:${email.trim()}`;
    }
    case 'wifi': {
      const { ssid, password, encryption, hidden } = content.data;
      const enc: WifiEncryption = encryption;
      const pass = enc === 'nopass' ? '' : escapeWifi(password);
      return `WIFI:T:${enc};S:${escapeWifi(ssid)};P:${pass};H:${hidden ? 'true' : 'false'};;`;
    }
    default:
      return '';
  }
}

/** Human-readable label for history and UI. */
export function getDisplayLabel(content: ContentData): string {
  switch (content.type) {
    case 'url':
      return content.data.url.trim() || 'URL';
    case 'text':
      return content.data.text.trim().slice(0, 60) || 'Text';
    case 'phone':
      return content.data.phone.trim() || 'Phone';
    case 'email':
      return content.data.email.trim() || 'Email';
    case 'wifi':
      return content.data.ssid.trim() || 'Wi-Fi';
    default:
      return 'QR Code';
  }
}

/** Validate form input before generating QR code. */
export function validateContent(content: ContentData): ValidationResult {
  switch (content.type) {
    case 'url': {
      const url = content.data.url.trim();
      if (!url) return { valid: false, message: 'Please enter a URL.' };
      try {
        const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
        new URL(normalized);
        return { valid: true };
      } catch {
        return { valid: false, message: 'Please enter a valid URL (e.g. example.com).' };
      }
    }
    case 'text': {
      if (!content.data.text.trim()) {
        return { valid: false, message: 'Please enter some text.' };
      }
      if (content.data.text.length > 4296) {
        return { valid: false, message: 'Text is too long (max ~4,000 characters).' };
      }
      return { valid: true };
    }
    case 'phone': {
      const phone = content.data.phone.replace(/[^\d+]/g, '');
      if (!phone) return { valid: false, message: 'Please enter a phone number.' };
      if (phone.length < 7) {
        return { valid: false, message: 'Phone number seems too short.' };
      }
      return { valid: true };
    }
    case 'email': {
      const email = content.data.email.trim();
      if (!email) return { valid: false, message: 'Please enter an email address.' };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
      }
      return { valid: true };
    }
    case 'wifi': {
      const ssid = content.data.ssid.trim();
      if (!ssid) return { valid: false, message: 'Please enter a Wi-Fi network name (SSID).' };
      if (content.data.encryption !== 'nopass' && !content.data.password) {
        return { valid: false, message: 'Please enter the Wi-Fi password.' };
      }
      return { valid: true };
    }
    default:
      return { valid: false, message: 'Unknown content type.' };
  }
}

/** Default empty form state per content type. */
export function getDefaultContentData(type: ContentType): ContentData {
  switch (type) {
    case 'url':
      return { type: 'url', data: { url: '' } };
    case 'text':
      return { type: 'text', data: { text: '' } };
    case 'phone':
      return { type: 'phone', data: { phone: '' } };
    case 'email':
      return { type: 'email', data: { email: '', subject: '', body: '' } };
    case 'wifi':
      return {
        type: 'wifi',
        data: { ssid: '', password: '', encryption: 'WPA', hidden: false },
      };
  }
}

/** Sanitize user-provided filename for download. */
export function sanitizeFilename(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100);
  return cleaned || 'qr-code';
}
