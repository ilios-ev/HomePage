# PROMPT A — HTML Shell & Tailwind Config

Copy-paste this into a separate AI chat.

---

```
You are a Senior Frontend Engineer building a static bilingual website for "ilios", a golf cart maintenance ecosystem company in Egypt. Create TWO files:

### FILE 1: src/index.html
- Bilingual: default lang="en" dir="ltr". A language toggle will switch to lang="ar" dir="rtl" via JS.
- Load Google Fonts: Inter (400,500,600,700) AND Cairo (400,700).
- Link to css/output.css (Tailwind CLI compiled output).
- Link to js/tools.js (defer) and js/main.js (defer, type="module").
- ZERO hard-coded text. Every visible string uses data-i18n="dotpath.key" attribute that main.js populates from data.json.
- Use semantic HTML5 elements throughout.

Structure exactly 8 sections plus 2 modals:

1. <header id="header">: Sticky top, z-50, dark bg (slate-900/95 with backdrop-blur). Contains:
   - Logo span (data-i18n="nav.logo_text")
   - Nav links (class="nav-link", each with data-i18n)
   - Language toggle button (id="lang-toggle") showing "عربي" or "EN"
   - "Client Login" button (id="btn-login", transparent bg, gold border, data-i18n="nav.btn_login_text")
   - "Request Inspection" CTA (id="btn-cta-header", forest bg, data-i18n="nav.btn_cta_text")
   - Mobile hamburger button (id="mobile-menu-btn"), hidden on md+

2. <section id="hero">: min-h-screen, hero-gradient overlay class. Contains:
   - h1 (data-i18n="hero.headline")
   - p (data-i18n="hero.subheadline"), gold colored
   - "Book Inspection" btn (id="btn-book-inspection", data-i18n="hero.cta_primary_text", opens visit-modal)
   - "Explore Ecosystem" btn (id="btn-explore", data-i18n="hero.cta_secondary_text", gold border, scrolls to #smart-tools)

3. <section id="smart-tools">: slate-900 bg. Contains:
   - Section title h2 (data-i18n="smart_tools.section_title")
   - Subtitle p (data-i18n="smart_tools.section_subtitle")
   - Two glass-card divs side by side (md:grid-cols-2):
     a) SOH card (id="soh-card"): select (id="soh-battery-type"), 3 number inputs (id="soh-voltage", id="soh-voltage-after", id="soh-distance"), all inputs use class="ilios-input". Calculate btn, results div (id="soh-result").
     b) ROI card (id="roi-card"): range slider (id="roi-fleet-size", min=5 max=500 step=5, class="ilios-slider"), fleet size label (id="roi-fleet-label"), number input (id="roi-breakdown-cost", class="ilios-input"). Calculate btn, results div (id="roi-result").
   - All input labels use data-i18n attributes.

4. <section id="services">: forest-light bg. Contains:
   - Title h2 (data-i18n="services.section_title")
   - B2C group div (id="b2c-services") — empty container, cards built by main.js from JSON
   - B2B group div (id="b2b-services") — empty container, cards built by main.js from JSON

5. <section id="trust">: slate-900 bg. Contains:
   - Vigorey badge img (id="vigorey-badge")
   - Stats row: 3 spans (class="stat-counter", each with data-target and data-suffix attributes, plus a label span with data-i18n)
   - LinkedIn feed placeholder div (id="linkedin-feed", data-i18n="trust.linkedin.placeholder_text")

6. <section id="coverage">: forest bg. Contains:
   - Title h2 (data-i18n="coverage.section_title")
   - Container div (id="coverage-cards") — empty, built by main.js
   - Paragraph (id="nationwide-note", data-i18n="coverage.nationwide_note")

7. <section id="partner">: slate-900 bg. Contains:
   - Title h2 (data-i18n="partner.section_title")
   - Subtitle p (data-i18n="partner.section_subtitle")
   - Form (id="partner-form"): text input name="name", text input name="company", tel input name="phone", email input name="email", select name="partner_type" (options populated by JS), submit btn (data-i18n="partner.form.btn_text"). All inputs class="ilios-input".
   - Response div (id="partner-response")

8. <footer id="footer">: slate-900 bg, border-t. Contains:
   - Contact info div with spans using data-i18n for labels
   - Quick links list (built by JS or static with data-i18n)
   - Social icons row (LinkedIn, Facebook, WhatsApp) with href placeholders
   - Copyright line (data-i18n="footer.copyright")

MODALS (hidden by default):
- Visit modal (id="visit-modal", class="modal-overlay"): Contains .modal-content.glass-card with close btn (class="modal-close"), title (data-i18n="modals.visit.title"), form (id="visit-form") with: name, phone, location select (Cairo/Giza/Sokhna/NorthCoast), cart_brand text, preferred_date date input. Submit btn, response div (id="visit-response").
- B2B modal (id="b2b-modal", class="modal-overlay"): Contains .modal-content.glass-card with close btn, title (data-i18n="modals.b2b_quote.title"), form (id="b2b-form") with: company, contact_person, phone, fleet_size number, message textarea. Submit btn, response div (id="b2b-response").

### FILE 2: tailwind.config.js (standalone file, NOT inline script)
```js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1B4332', light: '#2D6A4F' },
        lime: { DEFAULT: '#74C69D', light: '#95D5B2' },
        gold: { DEFAULT: '#FFD700', dim: '#F2C94C' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 5px rgba(255,215,0,0.3)' }, '50%': { boxShadow: '0 0 20px rgba(255,215,0,0.6)' } },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
```

### STYLING APPROACH:
- Use Tailwind utility classes directly on elements.
- Dark slate-900 base for hero, tools, trust, partner, footer sections.
- Forest green for services/coverage sections.
- Gold accents on CTAs and highlights.
- glass-card class for calculator cards and modal content (defined in CSS file, not here).
- All inputs use ilios-input class (defined in CSS file).
- Responsive: mobile-first. Single column on mobile, grids on md+.
- Add class="fade-in-up" to section content wrappers for scroll animation.
- RTL: use Tailwind rtl: variants where needed (e.g., rtl:text-right). The dir attribute on <html> handles most layout flipping automatically.
- Font: add class="font-arabic" to <body> when lang=ar (handled by JS, but structure the classes so this works).

### CONSTRAINTS:
- Do NOT write any JavaScript logic.
- Do NOT hard-code any text strings — use data-i18n attributes everywhere.
- Output the two files clearly separated.
```
