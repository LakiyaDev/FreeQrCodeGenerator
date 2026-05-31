import type { ContentData } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ContentFormProps {
  content: ContentData;
  onChange: (content: ContentData) => void;
  fieldError?: string;
}

export function ContentForm({ content, onChange, fieldError }: ContentFormProps) {
  switch (content.type) {
    case 'url':
      return (
        <Input
          label="Website URL"
          placeholder="https://example.com"
          value={content.data.url}
          error={fieldError}
          hint="We'll add https:// if you omit the protocol."
          onChange={(e) =>
            onChange({ type: 'url', data: { url: e.target.value } })
          }
        />
      );

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
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
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
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No password (open network)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
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

    default:
      return null;
  }
}
