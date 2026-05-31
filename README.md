# Free QR Code Generator

A modern, production-ready **static QR code generator** built with React, TypeScript, and Tailwind CSS. Generate non-expiring QR codes entirely in the browser — no account, no redirects, no server required.

![Static QR codes](public/favicon.svg)

## Features

- **Static QR codes** — data is encoded directly (never expires, works offline)
- **Content types:** URL, Text, Phone, Email, Wi-Fi
- **Instant preview** with live customization updates
- **Download formats:** PNG, SVG, PDF, JPG (with custom filename)
- **Social sharing:** WhatsApp, Facebook, X, LinkedIn, Telegram, Email, Instagram (download guidance)
- **Customization:** frames, foreground/background colors, size, error correction, center logo
- **History:** last 24 QR codes stored in `localStorage`
- **Dark mode** toggle with system preference detection
- **Copy Content** and **Generate New QR** actions
- Fully **responsive** for mobile and desktop
- **Accessible** form labels, ARIA attributes, keyboard navigation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| QR Engine | [qr-code-styling](https://www.npmjs.com/package/qr-code-styling) |
| PDF Export | [jsPDF](https://github.com/parallax/jsPDF) |
| Icons | [Lucide React](https://lucide.dev) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone or navigate to the project
cd FreeQrCodeGenerator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview production build locally
```

Output is written to the `dist/` folder.

## Project Structure

```
src/
├── components/
│   ├── actions/       # Download, share, copy buttons
│   ├── generator/     # QR builder UI (forms, preview, customization)
│   ├── history/       # localStorage history grid
│   ├── layout/        # Header, footer
│   ├── marketing/     # Hero, FAQ, how-it-works
│   └── ui/            # Reusable Button, Input, Accordion
├── context/           # Shared history state
├── hooks/             # useDarkMode, useQrHistory
├── lib/               # QR encoding, download, share, validation
├── types/             # TypeScript interfaces
├── App.tsx
└── main.tsx
```

## Deployment

### Vercel

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no extra config needed
4. `vercel.json` includes SPA rewrites

Or via CLI:

```bash
npm i -g vercel
vercel
```

### Netlify

1. Connect your repository at [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

Or drag-and-drop the `dist/` folder after running `npm run build`.

`netlify.toml` is included with SPA redirect rules.

## How Static QR Codes Work

Unlike dynamic QR services that use short URLs, this app encodes your content **directly** into the QR pattern:

| Type | Encoded format |
|------|----------------|
| URL | `https://example.com` |
| Text | Plain text string |
| Phone | `tel:+15551234567` |
| Email | `mailto:user@example.com?subject=...` |
| Wi-Fi | `WIFI:T:WPA;S:Network;P:password;H:false;;` |

Once generated, the QR code works forever without depending on this website.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT — free to use for personal and commercial projects.
# FreeQrCodeGenerator
