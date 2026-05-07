# PROMPT D — main.js (App Controller)

Copy-paste this into a separate AI chat.

---

```
You are a Senior JavaScript Engineer building src/js/main.js for "ilios", a static bilingual (EN/AR) website. This is the application controller — it handles i18n, DOM population, calculators, forms, and UI behavior. ES6 modules only. Vanilla JS. No external libraries.

Import at the top:
  import { calcSOH, calcROI } from './tools.js';

---

### BLOCK 1 — Configuration & Constants

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE"; // ← Replace after Google Apps Script deployment
// NOTE: The Google Apps Script at this URL handles BOTH notifications server-side:
//   1. Email to admin via MailApp.sendEmail()
//   2. WhatsApp to admin via CallMeBot API (UrlFetchApp.fetch)
// main.js only needs to call this one URL and read {status:"ok"} or {status:"error"}.

let appData = null;        // Will hold the parsed data.json object
let currentLang = localStorage.getItem("ilios_lang") || "en";

---

### BLOCK 2 — i18n Engine

function t(dotPath) {
  // Resolves "hero.headline" → appData.hero.headline[currentLang]
  // Returns fallback "[missing: dotPath]" if key not found
}

function applyLanguage() {
  // 1. Set document.documentElement.lang = currentLang
  // 2. Set document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
  // 3. Toggle font class on body: "font-arabic" for AR, remove for EN
  // 4. Find all [data-i18n] elements, set textContent = t(element.dataset.i18n)
  // 5. Find all [data-i18n-placeholder] elements, set placeholder = t(...)
  // 6. Update lang toggle button text from data.nav.lang_toggle[currentLang]
  // 7. Save currentLang to localStorage("ilios_lang")
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  applyLanguage();
  // Re-populate dynamic content (dropdowns, cards) for the new language
  populateDynamicContent();
}

document.getElementById("lang-toggle").addEventListener("click", toggleLanguage);

---

### BLOCK 3 — DOM Population

async function init() {
  const response = await fetch("data.json");
  appData = await response.json();
  applyLanguage();
  populateDynamicContent();
  wireCalculators();
  wireAllForms();
  setupUIBehaviors();
  setupScrollAnimations();
}

function populateDynamicContent() {
  // Services: Clear #b2c-services and #b2b-services, then build cards dynamically.
  // Each card is a glass-card div with icon, title (h3), description (p).
  // Use appData.services.b2c.cards and appData.services.b2b.cards arrays.

  // Coverage: Clear #coverage-cards, build location cards from appData.coverage.locations.
  // Each card: icon emoji + name in currentLang.

  // Stats: Set data-target on .stat-counter elements from appData.trust.stats.
  // Each stat: value (e.g. "650"), suffix (e.g. "+"), label text.

  // Partner form dropdown: Clear and rebuild <select name="partner_type"> options
  // from appData.partner.form.partner_types using currentLang for labels.

  // Visit modal location dropdown: rebuild from appData.modals.visit.locations.

  // SOH battery type dropdown: rebuild from appData.smart_tools.soh.battery_types.

  // Footer social links: set href attributes from appData.footer.social.
  // Footer contact: populate spans with manager, phone, email.
}

---

### BLOCK 4 — Calculator Wiring

function wireCalculators() {
  // SOH Calculator
  document.getElementById("soh-card").querySelector(".calc-btn").addEventListener("click", () => {
    const batteryType = document.getElementById("soh-battery-type").value;
    const nominalV    = parseFloat(document.getElementById("soh-voltage").value);
    const afterLoadV  = parseFloat(document.getElementById("soh-voltage-after").value);
    const distance    = parseFloat(document.getElementById("soh-distance").value);
    const result = calcSOH(batteryType, nominalV, afterLoadV, distance);
    const resultEl = document.getElementById("soh-result");

    if (result.soh === null) {
      resultEl.innerHTML = `<span class="text-gray-400">${t("smart_tools.soh.result_prefix")} —</span>`;
      return;
    }
    // Lookup translated status from appData.smart_tools.soh.statuses[result.statusKey][currentLang]
    const translatedStatus = appData.smart_tools.soh.statuses[result.statusKey][currentLang];
    resultEl.innerHTML = `
      <div class="text-4xl font-bold" style="color:${result.color}">${result.soh}%</div>
      <div class="text-sm mt-1" style="color:${result.color}">${translatedStatus}</div>
      ${(result.statusKey === "poor" || result.statusKey === "critical")
        ? `<div class="mt-3 text-gold text-sm font-medium">${t("smart_tools.soh.cta_hook")}</div>`
        : ""}
    `;
  });

  // ROI Calculator — slider live label update
  const slider = document.getElementById("roi-fleet-size");
  const sliderLabel = document.getElementById("roi-fleet-label");
  slider.addEventListener("input", () => { sliderLabel.textContent = slider.value; });

  document.getElementById("roi-card").querySelector(".calc-btn").addEventListener("click", () => {
    const fleetSize  = parseInt(document.getElementById("roi-fleet-size").value);
    const breakdown  = parseFloat(document.getElementById("roi-breakdown-cost").value);
    const result = calcROI(fleetSize, breakdown);
    const resultEl = document.getElementById("roi-result");

    if (!result) {
      resultEl.innerHTML = `<span class="text-gray-400">Please enter valid values.</span>`;
      return;
    }
    const fmt = (n) => Math.round(n).toLocaleString() + " EGP";
    const labels = appData.smart_tools.roi.result_labels;
    resultEl.innerHTML = `
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span>${labels.reactive_cost[currentLang]}</span><span class="text-red-400 font-bold">${fmt(result.annualReactiveCost)}</span></div>
        <div class="flex justify-between"><span>${labels.ilios_cost[currentLang]}</span><span class="text-lime font-bold">${fmt(result.annualIliosCost)}</span></div>
        <div class="flex justify-between"><span>${labels.battery_savings[currentLang]}</span><span class="text-lime font-bold">${fmt(result.batterySavings)}</span></div>
        <hr class="border-white/20"/>
        <div class="flex justify-between text-lg"><span class="font-bold">${labels.annual_savings[currentLang]}</span><span class="text-gold font-bold">${fmt(result.annualSavings)}</span></div>
        <div class="flex justify-between"><span>${labels.roi_percent[currentLang]}</span><span class="text-gold font-bold">${result.roi}%</span></div>
      </div>
      <div class="mt-3 text-gold text-sm font-medium">${t("smart_tools.roi.cta_hook")}</div>
    `;
  });
}

---

### BLOCK 5 — Form Submission Handler

async function submitForm(formType, formData, responseElId, successMsgPath, errorMsgPath) {
  const responseEl = document.getElementById(responseElId);
  responseEl.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Submitting...";
  responseEl.className = "text-gold-dim text-sm mt-2 animate-pulse";

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: formType,
        lang: currentLang,
        timestamp: new Date().toISOString(),
        ...formData
      })
    });
    // The Apps Script triggers Email AND WhatsApp server-side before returning.
    const json = await res.json();

    if (json.status === "ok") {
      responseEl.textContent = t(successMsgPath);
      responseEl.className = "text-lime text-sm mt-2 font-semibold";
      return true; // signal success to caller
    } else {
      throw new Error(json.message || "Server error");
    }
  } catch (err) {
    responseEl.textContent = t(errorMsgPath);
    responseEl.className = "text-red-400 text-sm mt-2 font-semibold";
    console.error(`[ilios] ${formType} submission error:`, err);
    return false;
  }
}

function wireAllForms() {
  // 1. Visit form (inside visit-modal)
  document.getElementById("visit-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const ok = await submitForm(
      "visit",
      { name: fd.get("name"), phone: fd.get("phone"), location: fd.get("location"), cart_brand: fd.get("cart_brand"), preferred_date: fd.get("preferred_date") },
      "visit-response",
      "modals.visit.success_msg",
      "modals.visit.error_msg"
    );
    if (ok) { e.target.reset(); setTimeout(() => closeModal("visit-modal"), 2000); }
  });

  // 2. B2B form (inside b2b-modal)
  document.getElementById("b2b-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const ok = await submitForm(
      "b2b_quote",
      { company: fd.get("company"), contact_person: fd.get("contact_person"), phone: fd.get("phone"), fleet_size: fd.get("fleet_size"), message: fd.get("message") },
      "b2b-response",
      "modals.b2b_quote.success_msg",
      "modals.b2b_quote.error_msg"
    );
    if (ok) { e.target.reset(); setTimeout(() => closeModal("b2b-modal"), 2000); }
  });

  // 3. Partner form (inline section, no modal)
  document.getElementById("partner-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const ok = await submitForm(
      "partner",
      { name: fd.get("name"), company: fd.get("company"), phone: fd.get("phone"), email: fd.get("email"), partner_type: fd.get("partner_type") },
      "partner-response",
      "partner.form.success_msg",
      "partner.form.error_msg"
    );
    if (ok) { e.target.reset(); }
  });
}

---

### BLOCK 6 — UI Behaviors

function setupUIBehaviors() {
  // Modal open: #btn-book-inspection and #btn-cta-header open visit-modal
  // B2B quote link (anywhere with class "open-b2b-modal") opens b2b-modal
  function openModal(id) { document.getElementById(id).classList.add("active"); }
  function closeModal(id) { document.getElementById(id).classList.remove("active"); }
  window.closeModal = closeModal; // expose for setTimeout calls

  document.getElementById("btn-book-inspection").addEventListener("click", () => openModal("visit-modal"));
  document.getElementById("btn-cta-header").addEventListener("click", () => openModal("visit-modal"));
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal-overlay").id));
  });
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(overlay.id); });
  });

  // Smooth scroll: "Explore Ecosystem" → #smart-tools
  document.getElementById("btn-explore").addEventListener("click", () => {
    document.getElementById("smart-tools").scrollIntoView({ behavior: "smooth" });
  });

  // Mobile nav toggle
  document.getElementById("mobile-menu-btn").addEventListener("click", () => {
    document.getElementById("mobile-nav").classList.toggle("hidden");
  });
}

---

### BLOCK 7 — Scroll Animations

function setupScrollAnimations() {
  // IntersectionObserver for .fade-in-up elements
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); fadeObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade-in-up").forEach(el => fadeObserver.observe(el));

  // IntersectionObserver for stat counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + (progress === 1 ? suffix : "");
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-counter").forEach(el => counterObserver.observe(el));
}

---

### ENTRY POINT:
document.addEventListener("DOMContentLoaded", init);

### CONSTRAINTS:
- ES6 module syntax throughout (import/export).
- All display strings MUST come from appData via t() — never hard-code English or Arabic text.
- Add a short comment above each BLOCK explaining its responsibility.
- The APPS_SCRIPT_URL constant must be clearly marked with a comment showing where to paste the real URL.
- Output ONLY the src/js/main.js file content.
```
