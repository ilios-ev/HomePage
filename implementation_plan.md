# ilios Website — Implementation Plan v2

## 1. Folder & File Structure

```
ilios_web_project/
├── src/
│   ├── index.html              # Single-page shell (8 sections, bilingual hooks)
│   ├── data.json               # ALL text content (EN + AR per key)
│   ├── css/
│   │   └── input.css           # Tailwind directives + custom CSS
│   ├── js/
│   │   ├── main.js             # JSON fetch, DOM population, form handlers, i18n
│   │   └── tools.js            # SOH & ROI calculator logic (pure math)
│   └── assets/
│       ├── logo.svg
│       ├── hero-bg.webp
│       ├── vigorey-badge.webp
│       └── icons/
├── dist/                       # Built output → deployed to GitHub Pages
│   ├── index.html
│   ├── css/output.css          # Compiled & minified Tailwind
│   ├── js/  (copied)
│   ├── data.json (copied)
│   └── assets/ (copied)
├── tailwind.config.js          # Tailwind theme config
├── package.json                # Scripts: dev, build, watch
└── README.md
```

### Build Pipeline

```json
// package.json scripts
{
  "scripts": {
    "dev": "npx tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch",
    "build": "npx tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --minify",
    "copy": "Copy src/index.html, src/js/*, src/data.json, src/assets/* → dist/",
    "deploy": "npm run build && npm run copy"
  }
}
```

> [!TIP]
> GitHub Pages will serve from the `dist/` folder (set in repo Settings → Pages → Source → `/dist`).

### File Responsibilities

| File | Role |
|---|---|
| `src/index.html` | Semantic skeleton with `data-i18n` attributes. Zero hard-coded text. |
| `src/data.json` | Every string in both `"en"` and `"ar"` under each key. |
| `tailwind.config.js` | ilios palette, Inter + Cairo fonts, custom animations, RTL support. |
| `src/css/input.css` | `@tailwind` directives, glassmorphism, scroll-fade, modal, slider, RTL overrides. |
| `src/js/main.js` | i18n engine, DOM population, form submissions, UI utilities. |
| `src/js/tools.js` | `calcSOH()` and `calcROI()` — pure functions, no DOM coupling. |

---

## 2. Bilingual (i18n) Architecture

### Strategy

- `data.json` stores every string as `{ "en": "...", "ar": "..." }`.
- `main.js` reads the active language from `localStorage` (default: `"en"`).
- A language toggle button (`#lang-toggle`) in the header switches between EN/AR.
- On switch: update `<html lang>` and `<html dir>`, re-populate all `[data-i18n]` elements, save to `localStorage`.
- Font switches: EN → **Inter**, AR → **Cairo** (both loaded via Google Fonts).

### HTML Attribute Convention

```html
<h1 data-i18n="hero.headline"></h1>
<p data-i18n="hero.subheadline"></p>
<button data-i18n="nav.btn_cta_text"></button>
```

`main.js` resolves `"hero.headline"` → `data.hero.headline[currentLang]`.

### RTL Handling

- Tailwind CSS has built-in RTL support via `rtl:` variants (e.g., `rtl:text-right`).
- `tailwind.config.js` must NOT disable RTL.
- `<html dir="rtl" lang="ar">` is set dynamically.

---

## 3. Google Apps Script Strategy

### Flow (unchanged from v1)

```
Browser Form Submit
       │
       ▼
fetch(APPS_SCRIPT_URL, {method:"POST", body: JSON.stringify(payload)})
       │
       ▼
Google Apps Script (doPost)
  ├── 1. Parse payload (type: visit | b2b_quote | partner)
  ├── 2. Append row to Google Sheet (tab per form type)
  ├── 3. Send Email via MailApp.sendEmail() to admin
  └── 4. Send WhatsApp via UrlFetchApp.fetch() to CallMeBot API
       │
       ▼
Return JSON {status:"ok"} → Browser shows success toast
```

### CallMeBot Setup Instructions

> [!IMPORTANT]
> **How to get your CallMeBot API key:**
> 1. Save the number `+34 644 71 84 66` in your phone contacts.
> 2. Send this WhatsApp message to that number: `I allow callmebot to send me messages`.
> 3. You will receive a reply with your personal **API key**.
> 4. In your Google Apps Script, replace `YOUR_CALLMEBOT_API_KEY` with this key.
> 5. In the same script, replace `YOUR_WHATSAPP_NUMBER` with `201008602509` (Egypt format).
>
> The placeholder in the code is clearly marked as:
> ```js
> const CALLMEBOT_API_KEY = "YOUR_CALLMEBOT_API_KEY"; // ← Paste here
> const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";     // ← Paste here
> ```

### Form Types (3 endpoints, 1 script)

| Form | Payload Fields |
|---|---|
| Visit Request | name, phone, location, cart_brand, preferred_date |
| B2B Quotation | company, contact_person, phone, fleet_size, message |
| Partner Inquiry | name, company, phone, email, partner_type |

---

## 4. Tailwind Configuration Summary

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT: '#1B4332', light: '#2D6A4F' },
        lime:    { DEFAULT: '#74C69D', light: '#95D5B2' },
        gold:    { DEFAULT: '#FFD700', dim: '#F2C94C' },
        slate:   { 50: '#f8fafc', 900: '#0f172a' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite'
      }
    }
  }
}
```

---

## 5. Page Section Map (8 Sections)

| # | Section ID | Key Elements |
|---|---|---|
| 1 | `#header` | Logo, nav links, **lang toggle** (EN/AR), "Client Login" (gold border), "Request Inspection" (forest bg) |
| 2 | `#hero` | H1, subheadline, 2 CTAs, dark overlay bg |
| 3 | `#smart-tools` | SOH + ROI calculator glassmorphism cards |
| 4 | `#services` | B2C / B2B split cards |
| 5 | `#trust` | Vigorey badge, stats counters, LinkedIn placeholder |
| 6 | `#coverage` | 4 location cards + nationwide note |
| 7 | `#partner` | Lead-gen form with dropdown |
| 8 | `#footer` | Contacts, links, social icons, copyright |

---

## 6. Parallel Execution Prompts

See **`execution_prompts.md`** for all 5 copy-paste-ready prompts (A–E), updated for bilingual + Tailwind CLI build.

---

## Verification Plan

### Automated Tests
- `npm run build` completes without errors.
- Open `dist/index.html` → all 8 sections render.
- Toggle EN↔AR → text changes, direction flips, font switches.
- SOH/ROI calculators return correct values for known inputs.
- Form submissions show success/error feedback (with placeholder URL).

### Manual Verification
- Deploy `dist/` to GitHub Pages; test mobile responsiveness.
- Validate RTL layout on Arabic mode.
- Once Apps Script is deployed: confirm Email + WhatsApp arrive.
