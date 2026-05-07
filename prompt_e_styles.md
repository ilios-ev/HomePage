# PROMPT E — Styling & Animations (css/input.css)

Copy-paste this into a separate AI chat.

---

```
You are a UI/UX Engineer creating src/css/input.css for "ilios", a premium bilingual (EN/AR) golf cart maintenance ecosystem website in Egypt. The site uses Tailwind CSS CLI (NOT CDN). This file is the input to `npx tailwindcss` which compiles it to dist/css/output.css.

### FILE: src/css/input.css

---

SECTION 1 — TAILWIND DIRECTIVES (must be at the very top)
@tailwind base;
@tailwind components;
@tailwind utilities;

---

SECTION 2 — BASE LAYER OVERRIDES

@layer base {
  html { scroll-behavior: smooth; }
  
  body {
    @apply bg-slate-900 text-white font-sans antialiased;
  }
  
  /* Arabic font class applied by JS when lang=ar */
  body.font-arabic {
    font-family: 'Cairo', sans-serif;
    letter-spacing: 0;
  }
  
  ::selection { background: rgba(116, 198, 157, 0.3); color: #fff; }
  
  * { box-sizing: border-box; }
}

---

SECTION 3 — COMPONENT LAYER (@layer components)

@layer components {

  /* 1. GLASSMORPHISM CARD */
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .glass-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(116, 198, 157, 0.08);
  }

  /* 2. HERO GRADIENT OVERLAY */
  .hero-gradient {
    background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.93) 0%,
      rgba(27, 67, 50, 0.87) 60%,
      rgba(15, 23, 42, 0.95) 100%
    );
  }

  /* 3. SECTION DIVIDER */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(116,198,157,0.35) 50%, transparent 100%);
    margin: 0 auto;
    max-width: 600px;
  }

  /* 4. CUSTOM FORM INPUT (dark background) */
  .ilios-input {
    display: block;
    width: 100%;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.75rem;
    color: #fff;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    outline: none;
  }
  .ilios-input:focus {
    border-color: #74C69D;
    box-shadow: 0 0 0 3px rgba(116, 198, 157, 0.2);
  }
  .ilios-input::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }
  /* Select arrow on dark bg */
  .ilios-input option {
    background: #1a2332;
    color: #fff;
  }

  /* 5. RANGE SLIDER */
  .ilios-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.15);
    outline: none;
    cursor: pointer;
  }
  .ilios-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
    transition: box-shadow 0.2s;
  }
  .ilios-slider::-webkit-slider-thumb:hover {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
  .ilios-slider::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFD700;
    border: none;
    cursor: pointer;
  }

  /* 6. MODAL OVERLAY */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 9999;
    padding: 1rem;
  }
  .modal-overlay.active {
    opacity: 1;
    pointer-events: all;
  }
  .modal-content {
    max-width: 520px;
    width: 100%;
    max-height: 88vh;
    overflow-y: auto;
    transform: scale(0.94) translateY(10px);
    transition: transform 0.3s ease;
  }
  .modal-overlay.active .modal-content {
    transform: scale(1) translateY(0);
  }

  /* 7. NAV LINK */
  .nav-link {
    position: relative;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
    padding-bottom: 2px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: #74C69D;
    transition: width 0.25s ease;
  }
  .nav-link:hover { color: #fff; }
  .nav-link:hover::after { width: 100%; }

  /* 8. SERVICE CARD (inside services section) */
  .service-card {
    padding: 1.75rem;
    border-radius: 1.25rem;
    background: rgba(27, 67, 50, 0.4);
    border: 1px solid rgba(116, 198, 157, 0.15);
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .service-card:hover {
    border-color: rgba(116, 198, 157, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.2);
  }

  /* 9. COVERAGE CARD */
  .coverage-card {
    text-align: center;
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    transition: transform 0.3s, background 0.3s;
  }
  .coverage-card:hover {
    transform: scale(1.05);
    background: rgba(116, 198, 157, 0.12);
  }

  /* 10. STAT CARD */
  .stat-card {
    text-align: center;
    padding: 1.25rem;
  }
}

---

SECTION 4 — UTILITIES LAYER (@layer utilities)

@layer utilities {

  /* SCROLL FADE-IN (JS adds .visible via IntersectionObserver) */
  .fade-in-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.65s ease-out, transform 0.65s ease-out;
  }
  .fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  /* Staggered delay helpers */
  .delay-100 { transition-delay: 0.1s; }
  .delay-200 { transition-delay: 0.2s; }
  .delay-300 { transition-delay: 0.3s; }
}

---

SECTION 5 — KEYFRAME ANIMATIONS

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 6px rgba(255, 215, 0, 0.35); }
  50%       { box-shadow: 0 0 22px rgba(255, 215, 0, 0.7), 0 0 45px rgba(255, 215, 0, 0.2); }
}
.cta-glow { animation: pulseGlow 2.5s ease-in-out infinite; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
/* Shimmer effect for skeleton loading placeholders */
.shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
}

---

SECTION 6 — RTL OVERRIDES

/* When dir="rtl" (Arabic), flip specific layout elements that Tailwind rtl: doesn't handle automatically */
[dir="rtl"] .nav-link::after { left: auto; right: 0; }
[dir="rtl"] .modal-close { left: 1rem; right: auto; }
[dir="rtl"] .stat-counter { direction: ltr; display: inline-block; } /* Keep numbers LTR even in RTL */

---

SECTION 7 — RESPONSIVE OVERRIDES

@media (max-width: 768px) {
  .glass-card { margin: 0; border-radius: 1rem; }
  .hero-gradient { min-height: 100svh; }
  .modal-content { max-height: 92vh; }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up, .glass-card, .service-card, .coverage-card { transition: none !important; }
  .cta-glow { animation: none !important; }
}

---

### DESIGN PRINCIPLES REMINDER:
- Dark mode base: slate-900 / forest green.
- Glassmorphism: frosted glass on all interactive cards.
- Gold (#FFD700): CTAs, highlights, slider thumb, key numbers.
- Lime (#74C69D): success states, hover underlines, accents.
- Premium SaaS / Engineering Agency aesthetic — NOT a repair shop.
- All animations respect prefers-reduced-motion.
- RTL layout works automatically via [dir="rtl"] + Tailwind rtl: variants on the HTML elements.

### CONSTRAINTS:
- Use @layer for all custom classes so Tailwind's purge/scan works correctly.
- No inline styles. No !important except where absolutely necessary.
- Output ONLY the src/css/input.css file content.
```
