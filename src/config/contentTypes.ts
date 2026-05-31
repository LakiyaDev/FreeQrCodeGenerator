import {
  Globe,
  Contact,
  FileText,
  Images,
  Share2,
  Video,
  Type,
  Wifi,
  LayoutGrid,
  UtensilsCrossed,
  Phone,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import type { ContentType } from '@/types';

export interface ContentTypeMeta {
  type: ContentType;
  label: string;
  description: string;
  icon: LucideIcon;
  /** URL slug for /create/:slug */
  slug: string;
  step2Title: string;
  step2Subtitle: string;
}

export const CONTENT_TYPES: ContentTypeMeta[] = [
  {
    type: 'url',
    slug: 'website-url',
    label: 'Website URL',
    description: 'Link to a website of your choice',
    icon: Globe,
    step2Title: 'Website address',
    step2Subtitle: 'Enter the URL to which the QR code will link',
  },
  {
    type: 'vcard',
    slug: 'vcard',
    label: 'vCard',
    description: 'Share your electronic business card',
    icon: Contact,
    step2Title: 'Contact details',
    step2Subtitle: 'Enter the contact information for your vCard',
  },
  {
    type: 'pdf',
    slug: 'pdf',
    label: 'PDF',
    description: 'Show a PDF',
    icon: FileText,
    step2Title: 'PDF link',
    step2Subtitle: 'Enter the URL where your PDF is hosted',
  },
  {
    type: 'images',
    slug: 'images',
    label: 'Images',
    description: 'Display an image gallery',
    icon: Images,
    step2Title: 'Gallery URL',
    step2Subtitle: 'Enter the link to your image gallery',
  },
  {
    type: 'social',
    slug: 'social-media',
    label: 'Social Media',
    description: 'Share your social media channels',
    icon: Share2,
    step2Title: 'Social profile URL',
    step2Subtitle: 'Enter your social media profile or link page',
  },
  {
    type: 'video',
    slug: 'video',
    label: 'Video',
    description: 'Share one or multiple videos',
    icon: Video,
    step2Title: 'Video URL',
    step2Subtitle: 'Enter the link to your video (YouTube, Vimeo, etc.)',
  },
  {
    type: 'text',
    slug: 'text',
    label: 'Simple Text',
    description: 'Display a body of text',
    icon: Type,
    step2Title: 'Text content',
    step2Subtitle: 'Enter the message encoded in the QR code',
  },
  {
    type: 'wifi',
    slug: 'wifi',
    label: 'Wi-Fi',
    description: 'Connect to a wireless network',
    icon: Wifi,
    step2Title: 'Wi-Fi credentials',
    step2Subtitle: 'Enter network name and password',
  },
  {
    type: 'app',
    slug: 'app',
    label: 'App',
    description: 'Link to the iOS App Store / Google Play',
    icon: LayoutGrid,
    step2Title: 'App store links',
    step2Subtitle: 'Enter App Store and/or Google Play URLs',
  },
  {
    type: 'menu',
    slug: 'menu',
    label: 'Menu',
    description: 'Create a digital restaurant menu',
    icon: UtensilsCrossed,
    step2Title: 'Menu URL',
    step2Subtitle: 'Enter the link to your digital menu',
  },
  {
    type: 'phone',
    slug: 'phone',
    label: 'Phone',
    description: 'Share a click-to-call number',
    icon: Phone,
    step2Title: 'Phone number',
    step2Subtitle: 'Enter the number people will call',
  },
  {
    type: 'email',
    slug: 'email',
    label: 'Email',
    description: 'Send a pre-filled email',
    icon: Mail,
    step2Title: 'Email details',
    step2Subtitle: 'Enter recipient and optional subject/body',
  },
];

export function getContentTypeMeta(type: ContentType): ContentTypeMeta {
  const found = CONTENT_TYPES.find((t) => t.type === type);
  if (!found) return CONTENT_TYPES[0];
  return found;
}

export function getContentTypeFromSlug(slug: string): ContentType | null {
  return CONTENT_TYPES.find((t) => t.slug === slug)?.type ?? null;
}

export const LINK_BASED_TYPES: ContentType[] = [
  'url',
  'pdf',
  'images',
  'social',
  'video',
  'menu',
];
