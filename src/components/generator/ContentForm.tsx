import type { ContentData, ContentType } from '@/types';
import { getContentTypeMeta, LINK_BASED_TYPES } from '@/config/contentTypes';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ContentFormProps {
  content: ContentData;
  onChange: (content: ContentData) => void;
  fieldError?: string;
}

function LinkUrlField({
  type,
  content,
  onChange,
  fieldError,
}: {
  type: ContentType;
  content: ContentData & { data: { url: string } };
  onChange: (content: ContentData) => void;
  fieldError?: string;
}) {
  const meta = getContentTypeMeta(type);
  return (
    <Input
      label={`${meta.label} URL`}
      placeholder="e.g. www.example.com"
      value={content.data.url}
      error={fieldError}
      hint="We'll add https:// if you omit the protocol."
      onChange={(e) => onChange({ type, data: { url: e.target.value } } as ContentData)}
    />
  );
}

export function ContentForm({ content, onChange, fieldError }: ContentFormProps) {
  if (LINK_BASED_TYPES.includes(content.type)) {
    return (
      <LinkUrlField
        type={content.type}
        content={content as ContentData & { data: { url: string } }}
        onChange={onChange}
        fieldError={fieldError}
      />
    );
  }

  switch (content.type) {
    case 'text':
      return (
        <Textarea
          label="Text content"
          placeholder="Enter your message..."
          value={content.data.text}
          error={fieldError}
          onChange={(e) =>
            onChange({ type: 'text', data: { text: e.target.value } })
          }
        />
      );

    case 'phone':
      return (
        <Input
          label="Phone number"
          type="tel"
          placeholder="+1 555 123 4567"
          value={content.data.phone}
          error={fieldError}
          hint="Include country code for international numbers."
          onChange={(e) =>
            onChange({ type: 'phone', data: { phone: e.target.value } })
          }
        />
      );

    case 'email':
      return (
        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="hello@example.com"
            value={content.data.email}
            error={fieldError}
            onChange={(e) =>
              onChange({
                type: 'email',
                data: { ...content.data, email: e.target.value },
              })
            }
          />
          <Input
            label="Subject (optional)"
            placeholder="Email subject"
            value={content.data.subject}
            onChange={(e) =>
              onChange({
                type: 'email',
                data: { ...content.data, subject: e.target.value },
              })
            }
          />
          <Textarea
            label="Body (optional)"
            placeholder="Email message..."
            value={content.data.body}
            onChange={(e) =>
              onChange({
                type: 'email',
                data: { ...content.data, body: e.target.value },
              })
            }
          />
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-4">
          <Input
            label="Network name (SSID)"
            placeholder="My Wi-Fi Network"
            value={content.data.ssid}
            error={fieldError}
            onChange={(e) =>
              onChange({
                type: 'wifi',
                data: { ...content.data, ssid: e.target.value },
              })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Wi-Fi password"
            value={content.data.password}
            onChange={(e) =>
              onChange({
                type: 'wifi',
                data: { ...content.data, password: e.target.value },
              })
            }
          />
          <div>
            <label
              htmlFor="wifi-encryption"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Encryption
            </label>
            <select
              id="wifi-encryption"
              value={content.data.encryption}
              onChange={(e) =>
                onChange({
                  type: 'wifi',
                  data: {
                    ...content.data,
                    encryption: e.target.value as typeof content.data.encryption,
                  },
                })
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No password (open network)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={content.data.hidden}
              onChange={(e) =>
                onChange({
                  type: 'wifi',
                  data: { ...content.data, hidden: e.target.checked },
                })
              }
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Hidden network
          </label>
        </div>
      );

    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              placeholder="John"
              value={content.data.firstName}
              error={fieldError}
              onChange={(e) =>
                onChange({
                  type: 'vcard',
                  data: { ...content.data, firstName: e.target.value },
                })
              }
            />
            <Input
              label="Last name"
              placeholder="Doe"
              value={content.data.lastName}
              onChange={(e) =>
                onChange({
                  type: 'vcard',
                  data: { ...content.data, lastName: e.target.value },
                })
              }
            />
          </div>
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 555 123 4567"
            value={content.data.phone}
            onChange={(e) =>
              onChange({
                type: 'vcard',
                data: { ...content.data, phone: e.target.value },
              })
            }
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={content.data.email}
            onChange={(e) =>
              onChange({
                type: 'vcard',
                data: { ...content.data, email: e.target.value },
              })
            }
          />
          <Input
            label="Company (optional)"
            placeholder="Acme Inc."
            value={content.data.company}
            onChange={(e) =>
              onChange({
                type: 'vcard',
                data: { ...content.data, company: e.target.value },
              })
            }
          />
          <Input
            label="Website (optional)"
            placeholder="www.example.com"
            value={content.data.website}
            onChange={(e) =>
              onChange({
                type: 'vcard',
                data: { ...content.data, website: e.target.value },
              })
            }
          />
        </div>
      );

    case 'app':
      return (
        <div className="space-y-4">
          <Input
            label="App Store URL (iOS)"
            placeholder="https://apps.apple.com/..."
            value={content.data.iosUrl}
            error={fieldError}
            onChange={(e) =>
              onChange({
                type: 'app',
                data: { ...content.data, iosUrl: e.target.value },
              })
            }
          />
          <Input
            label="Google Play URL (Android)"
            placeholder="https://play.google.com/..."
            value={content.data.androidUrl}
            onChange={(e) =>
              onChange({
                type: 'app',
                data: { ...content.data, androidUrl: e.target.value },
              })
            }
          />
          <p className="text-xs text-slate-500">
            Enter at least one store link. iOS URL is used when both are provided.
          </p>
        </div>
      );

    default:
      return null;
  }
}
