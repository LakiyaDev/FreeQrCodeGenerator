import type {
  ContentData,
  ContentType,
  LinkContent,
  ValidationResult,
  WifiEncryption,
} from '@/types';
import { CONTENT_TYPE_LABELS } from '@/types';
import { LINK_BASED_TYPES } from '@/config/contentTypes';

function isLinkContent(
  content: ContentData,
): content is Extract<ContentData, { data: LinkContent }> {
  return LINK_BASED_TYPES.includes(content.type);
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function buildVCard(data: ContentData & { type: 'vcard' }): string {
  const { firstName, lastName, phone, email, company, website } = data.data;
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
  const fn = [firstName, lastName].filter(Boolean).join(' ').trim();
  if (fn) lines.push(`FN:${fn}`);
  if (phone.trim()) lines.push(`TEL:${phone.trim()}`);
  if (email.trim()) lines.push(`EMAIL:${email.trim()}`);
  if (company.trim()) lines.push(`ORG:${company.trim()}`);
  if (website.trim()) lines.push(`URL:${normalizeUrl(website)}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

function validateUrl(url: string, label = 'URL'): ValidationResult {
  if (!url.trim()) return { valid: false, message: `Please enter a ${label}.` };
  try {
    new URL(normalizeUrl(url));
    return { valid: true };
  } catch {
    return { valid: false, message: `Please enter a valid ${label} (e.g. example.com).` };
  }
}

export function encodeQrContent(content: ContentData): string {
  if (isLinkContent(content)) {
    return normalizeUrl(content.data.url);
  }

  switch (content.type) {
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
    case 'vcard':
      return buildVCard(content);
    case 'app': {
      const { iosUrl, androidUrl } = content.data;
      if (iosUrl.trim()) return normalizeUrl(iosUrl);
      if (androidUrl.trim()) return normalizeUrl(androidUrl);
      return '';
    }
    default:
      return '';
  }
}

export function getDisplayLabel(content: ContentData): string {
  if (isLinkContent(content)) {
    return content.data.url.trim().slice(0, 60) || CONTENT_TYPE_LABELS[content.type];
  }

  switch (content.type) {
    case 'text':
      return content.data.text.trim().slice(0, 60) || 'Text';
    case 'phone':
      return content.data.phone.trim() || 'Phone';
    case 'email':
      return content.data.email.trim() || 'Email';
    case 'wifi':
      return content.data.ssid.trim() || 'Wi-Fi';
    case 'vcard': {
      const name = [content.data.firstName, content.data.lastName].filter(Boolean).join(' ');
      return name || 'vCard';
    }
    case 'app':
      return content.data.iosUrl.trim() || content.data.androidUrl.trim() || 'App';
    default:
      return 'QR Code';
  }
}

export function validateContent(content: ContentData): ValidationResult {
  if (isLinkContent(content)) {
    return validateUrl(content.data.url);
  }

  switch (content.type) {
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    case 'vcard': {
      const { firstName, lastName, phone, email } = content.data;
      if (!firstName.trim() && !lastName.trim() && !phone.trim() && !email.trim()) {
        return { valid: false, message: 'Please enter at least a name, phone, or email.' };
      }
      return { valid: true };
    }
    case 'app': {
      const { iosUrl, androidUrl } = content.data;
      if (!iosUrl.trim() && !androidUrl.trim()) {
        return { valid: false, message: 'Please enter at least one app store URL.' };
      }
      if (iosUrl.trim()) {
        const r = validateUrl(iosUrl, 'App Store URL');
        if (!r.valid) return r;
      }
      if (androidUrl.trim()) {
        const r = validateUrl(androidUrl, 'Google Play URL');
        if (!r.valid) return r;
      }
      return { valid: true };
    }
    default:
      return { valid: false, message: 'Unknown content type.' };
  }
}

export function getDefaultContentData(type: ContentType): ContentData {
  if (LINK_BASED_TYPES.includes(type)) {
    return { type, data: { url: '' } } as ContentData;
  }

  switch (type) {
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
    case 'vcard':
      return {
        type: 'vcard',
        data: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          company: '',
          website: '',
        },
      };
    case 'app':
      return { type: 'app', data: { iosUrl: '', androidUrl: '' } };
    default:
      return { type: 'url', data: { url: '' } };
  }
}

export function sanitizeFilename(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100);
  return cleaned || 'qr-code';
}

export function getPreviewUrl(content: ContentData): string | null {
  if (isLinkContent(content)) {
    const url = content.data.url.trim();
    return url ? normalizeUrl(url).replace(/^https?:\/\//i, '') : null;
  }
  if (content.type === 'vcard' && content.data.website.trim()) {
    return normalizeUrl(content.data.website).replace(/^https?:\/\//i, '');
  }
  if (content.type === 'app') {
    const url = content.data.iosUrl.trim() || content.data.androidUrl.trim();
    return url ? normalizeUrl(url).replace(/^https?:\/\//i, '') : null;
  }
  return null;
}
