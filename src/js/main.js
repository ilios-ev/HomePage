// === CONFIGURATION ===
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwA1_Bje3kvWxHuXK39AZ8gnWiD3qR2LkKWuJ1rwBgad52w_FcvIEgaIomMQyoDQ7rp/exec";
let appData = null;
let currentLang = localStorage.getItem("ilios_lang") || "en";

// === SVG ICONS MAP ===
const ICONS = {
  wrench: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/></svg>`,
  battery: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 10.5h.375a.375.375 0 01.375.375v2.25a.375.375 0 01-.375.375H21m-7.5 0h.008v.008H13.5v-.008zm-4.5 0h.008v.008H9v-.008zm-4.5 0h.008v.008H4.5v-.008zM3 10.5h-.375A.375.375 0 002.25 10.875v2.25c0 .207.168.375.375.375H3M21 10.5V6.75A2.25 2.25 0 0018.75 4.5h-13.5A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V10.5z"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  chart: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>`,
  document: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  cpu: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
};

// === i18n ENGINE ===
function t(dotPath) {
  if (!appData) return `[${dotPath}]`;
  const keys = dotPath.split('.');
  let value = appData;
  for (const key of keys) {
    if (value == null) return `[${dotPath}]`;
    value = value[key];
  }
  if (value && typeof value === 'object' && value[currentLang] !== undefined) return value[currentLang];
  if (typeof value === 'string') return value;
  return `[${dotPath}]`;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  currentLang === "ar"
    ? document.body.classList.add("font-arabic")
    : document.body.classList.remove("font-arabic");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === "TITLE") { document.title = val; }
    else { el.textContent = val; }
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn && appData?.nav?.lang_toggle) {
    langBtn.textContent = appData.nav.lang_toggle[currentLang];
  }
  localStorage.setItem("ilios_lang", currentLang);
}

// === INIT ===
async function init() {
  try {
    const res = await fetch("src/data.json");
    if (!res.ok) throw new Error("Failed to load data.json");
    appData = await res.json();

    applyLanguage();
    populateDynamic();
    wireCalculators();
    wireAllForms();
    setupUI();
    setupScrollAnimations();

    document.getElementById("lang-toggle")?.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      applyLanguage();
      populateDynamic();
    });
  } catch (err) {
    console.error("Init error:", err);
  }
}

// === DYNAMIC CONTENT ===
function populateDynamic() {
  if (!appData) return;

  // B2C Services
  const b2c = document.getElementById("b2c-services");
  if (b2c && appData.services?.b2c?.cards) {
    b2c.innerHTML = appData.services.b2c.cards.map(card => `
      <div class="glass-card p-6 rounded-xl fade-in-up visible">
        <div class="text-lime mb-4">${ICONS[card.icon] || card.icon}</div>
        <h3 class="text-xl font-bold text-white mb-2">${card.title[currentLang]}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${card.description[currentLang]}</p>
      </div>`).join('');
  }

  // B2B Services
  const b2b = document.getElementById("b2b-services");
  if (b2b && appData.services?.b2b?.cards) {
    b2b.innerHTML = appData.services.b2b.cards.map(card => `
      <div class="glass-card p-6 rounded-xl fade-in-up visible">
        <div class="text-gold mb-4">${ICONS[card.icon] || card.icon}</div>
        <h3 class="text-xl font-bold text-white mb-2">${card.title[currentLang]}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${card.description[currentLang]}</p>
      </div>`).join('');
  }

  // Coverage
  const cov = document.getElementById("coverage-cards");
  if (cov && appData.coverage?.locations) {
    cov.innerHTML = appData.coverage.locations.map(loc => `
      <div class="glass-card p-6 rounded-lg text-center fade-in-up visible">
        <div class="text-4xl mb-3">${loc.icon}</div>
        <div class="font-bold text-white text-lg">${loc.name[currentLang]}</div>
      </div>`).join('');
  }

  // Partner type dropdown
  const partnerSel = document.querySelector('select[name="partner_type"]');
  if (partnerSel && appData.partner?.form?.partner_types) {
    partnerSel.innerHTML = appData.partner.form.partner_types.map(pt =>
      `<option value="${pt.value}">${pt.label[currentLang]}</option>`).join('');
  }

  // Visit modal location dropdown
  const visitLocSel = document.querySelector('#visit-form select[name="location"]');
  if (visitLocSel && appData.modals?.visit?.locations) {
    visitLocSel.innerHTML = appData.modals.visit.locations.map(loc =>
      `<option value="${loc.value}">${loc.label[currentLang]}</option>`).join('');
  }

  // SOH battery type dropdown
  const sohSel = document.getElementById("soh-battery-type");
  if (sohSel && appData.smart_tools?.soh?.battery_types) {
    sohSel.innerHTML = appData.smart_tools.soh.battery_types.map(bt =>
      `<option value="${bt.value}">${bt.label[currentLang]}</option>`).join('');
  }

  // Footer: actual contact values
  const emailEl = document.getElementById("footer-email");
  const phoneEl = document.getElementById("footer-phone");
  const addrEl  = document.getElementById("footer-address");
  if (emailEl && appData.footer?.contact?.email) {
    emailEl.textContent = appData.footer.contact.email;
    emailEl.href = `mailto:${appData.footer.contact.email}`;
  }
  if (phoneEl && appData.footer?.contact?.phone) {
    phoneEl.textContent = `+2${appData.footer.contact.phone}`;
    phoneEl.href = `tel:+2${appData.footer.contact.phone}`;
  }
  if (addrEl) addrEl.textContent = currentLang === "ar" ? "القاهرة، مصر" : "Cairo, Egypt";

  // Footer: social links
  if (appData.footer?.social) {
    appData.footer.social.forEach(s => {
      const el = document.getElementById(`social-${s.icon}`);
      if (el) el.href = s.url;
    });
  }

  // LinkedIn section
  const liEl = document.getElementById("linkedin-cta");
  if (liEl && appData.footer?.social) {
    const li = appData.footer.social.find(s => s.icon === "linkedin");
    if (li) liEl.href = li.url;
  }
}

// === CALCULATORS ===
function wireCalculators() {
  // SOH
  document.getElementById("btn-calc-soh")?.addEventListener("click", () => {
    const bt = document.getElementById("soh-battery-type").value;
    const nv = parseFloat(document.getElementById("soh-nominal-voltage").value);
    const cap = parseFloat(document.getElementById("soh-capacity").value);
    const age = parseFloat(document.getElementById("soh-age").value);
    const socS = parseFloat(document.getElementById("soh-soc-start").value);
    const vs = parseFloat(document.getElementById("soh-v-start").value);
    const socE = parseFloat(document.getElementById("soh-soc-end").value);
    const ve = parseFloat(document.getElementById("soh-v-end").value);
    const vl = parseFloat(document.getElementById("soh-v-load").value);
    const dist = parseFloat(document.getElementById("soh-distance").value);
    const exp = parseFloat(document.getElementById("soh-expected-range").value);

    const result = calcSOH(bt, nv, cap, age, socS, vs, socE, ve, vl, dist, exp);
    
    const el = document.getElementById("soh-result");
    el.classList.remove("hidden");
    
    if (result.error) {
      el.innerHTML = `<div class="text-red-400 font-medium p-4 bg-red-400/10 rounded-lg">
        ${currentLang === "ar" ? "يرجى إدخال قيم صحيحة وممكنة" : result.status}</div>`;
      return;
    }

    const statusLabel = appData?.smart_tools?.soh?.statuses?.[result.statusKey]?.[currentLang] || result.statusKey;
    
    el.innerHTML = `
      <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <!-- Main SOH -->
        <div class="text-center">
          <div class="text-slate-400 text-sm uppercase tracking-widest mb-1">State of Health</div>
          <div class="text-5xl font-bold mb-2" style="color:${result.color}">${result.soh}%</div>
          <div class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style="background:${result.color}22; color:${result.color}">
            ${statusLabel}
          </div>
        </div>

        <div class="h-px bg-white/10"></div>

        <!-- Breakdown Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-medium">
              <span class="text-slate-400">Range Health</span>
              <span class="text-white">${result.rangeHealth}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="h-full bg-lime rounded-full transition-all duration-1000" style="width:${Math.min(100, result.rangeHealth)}%"></div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs font-medium">
              <span class="text-slate-400">Voltage Stress</span>
              <span class="text-white">${result.stressScore}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="h-full bg-orange-400 rounded-full transition-all duration-1000" style="width:${result.stressScore}%"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <span class="text-slate-400 text-sm">Consumption per KM</span>
          <span class="text-gold font-bold">${result.consumptionPerKm}%/km</span>
        </div>

        ${result.confidence === "Low" ? `
        <div class="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-xs text-center">
          ⚠️ ${currentLang === "ar" ? "دقة منخفضة: قد مسافة أطول (انخفاض الشحن > 10٪) لقراءة موثوقة." : "Low accuracy: Drive further for a larger SOC drop (>10%) to get a reliable reading."}
        </div>` : ''}

        ${(result.statusKey === "weak" || result.statusKey === "replace") ? `
        <div class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
          🚨 ${currentLang === "ar" ? "تحتاج بطاريتك إلى صيانة فورية" : "Battery degradation detected. Professional service is recommended."}
        </div>` : ''}
      </div>`;
  });

  // ROI slider
  const slider = document.getElementById("roi-fleet-size");
  const label  = document.getElementById("roi-fleet-label");
  slider?.addEventListener("input", () => { if (label) label.textContent = slider.value; });

  // ROI Calculate
  document.getElementById("btn-calc-roi")?.addEventListener("click", () => {
    const fleet   = parseInt(document.getElementById("roi-fleet-size").value);
    const cost    = parseFloat(document.getElementById("roi-breakdown-cost").value);
    const result  = calcROI(fleet, cost);
    const el      = document.getElementById("roi-result");
    el.classList.remove("hidden");

    if (!result) {
      el.innerHTML = `<div class="text-red-400 font-medium p-4 bg-red-400/10 rounded-lg">
        ${currentLang === "ar" ? "يرجى إدخال تكلفة أعطال صحيحة" : "Please enter a valid average breakdown cost per cart."}</div>`;
      return;
    }

    const fmt = n => Math.round(n).toLocaleString();
    const labels = appData?.smart_tools?.roi?.result_labels || {};
    el.innerHTML = `
      <div class="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div class="flex justify-between text-sm"><span class="text-slate-300">${(labels.reactive_cost||{})[currentLang]||"Current Reactive Cost"}</span><span class="text-red-400 font-bold">${fmt(result.annualReactiveCost)} EGP</span></div>
        <div class="flex justify-between text-sm"><span class="text-slate-300">${(labels.ilios_cost||{})[currentLang]||"ilios Contract Cost"}</span><span class="text-lime font-bold">${fmt(result.annualIliosCost)} EGP</span></div>
        <div class="flex justify-between text-sm"><span class="text-slate-300">${(labels.battery_savings||{})[currentLang]||"Battery Life Value"}</span><span class="text-lime font-bold">${fmt(result.batterySavings)} EGP</span></div>
        <hr class="border-white/20"/>
        <div class="flex justify-between text-lg font-bold"><span class="text-white">${(labels.annual_savings||{})[currentLang]||"Annual Savings"}</span><span class="text-gold">${fmt(result.annualSavings)} EGP</span></div>
        <div class="flex justify-between text-sm"><span class="text-slate-300">${(labels.roi_percent||{})[currentLang]||"ROI"}</span><span class="text-gold font-bold">${result.roi}%</span></div>
        <div class="mt-2 text-gold text-sm">💡 ${t("smart_tools.roi.cta_hook")}</div>
      </div>`;
  });
}

// === FORM SUBMISSION (WhatsApp fallback — no CORS issue) ===
async function submitToWhatsApp(formType, data) {
  // Build a readable WhatsApp message
  const lines = [`*ilios Form: ${formType}*`, `Lang: ${currentLang}`];
  for (const [k, v] of Object.entries(data)) lines.push(`${k}: ${v}`);
  const msg = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/201008602509?text=${msg}`, '_blank');
  return true;
}

async function submitForm(formType, data, responseElId) {
  const el = document.getElementById(responseElId);
  if (!el) return;
  el.className = "mt-4 text-gold text-sm text-center animate-pulse";
  el.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Submitting...";
  el.classList.remove("hidden");

  try {
    // Try Apps Script first
    const res = await Promise.race([
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ type: formType, lang: currentLang, timestamp: new Date().toISOString(), ...data })
      }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 5000))
    ]);
    const json = await res.json();
    if (json.status === "ok") {
      el.className = "mt-4 text-lime font-semibold text-center";
      el.textContent = currentLang === "ar" ? "تم الإرسال بنجاح! سنتواصل معك قريباً." : "Sent successfully! We'll be in touch soon.";
      return true;
    }
    throw new Error(json.message || "Server error");
  } catch (_) {
    // Fallback: open WhatsApp with the data
    await submitToWhatsApp(formType, data);
    el.className = "mt-4 text-lime font-semibold text-center";
    el.textContent = currentLang === "ar" ? "تم إرسالك إلى واتساب ✓" : "Redirected to WhatsApp ✓";
    return true;
  }
}

function wireAllForms() {
  // Visit form
  document.getElementById("visit-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const ok = await submitForm("visit", {
      name: fd.get("name"), phone: fd.get("phone"),
      location: fd.get("location"), cart_brand: fd.get("cart_brand"),
      preferred_date: fd.get("preferred_date")
    }, "visit-response");
    if (ok) { e.target.reset(); setTimeout(() => closeModal("visit-modal"), 3000); }
  });

  // B2B form
  document.getElementById("b2b-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const ok = await submitForm("b2b_quote", {
      company: fd.get("company"), contact_person: fd.get("contact_person"),
      phone: fd.get("phone"), fleet_size: fd.get("fleet_size"), message: fd.get("message")
    }, "b2b-response");
    if (ok) { e.target.reset(); setTimeout(() => closeModal("b2b-modal"), 3000); }
  });

  // Partner form
  document.getElementById("partner-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await submitForm("partner", {
      name: fd.get("name"), company: fd.get("company"),
      phone: fd.get("phone"), email: fd.get("email"), partner_type: fd.get("partner_type")
    }, "partner-response");
    e.target.reset();
  });
}

// === UI BEHAVIORS ===
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove("hidden"); setTimeout(() => m.classList.add("active"), 10); }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove("active"); setTimeout(() => m.classList.add("hidden"), 300); }
}
window.closeModal = closeModal;

function setupUI() {
  document.getElementById("btn-book-inspection")?.addEventListener("click", () => openModal("visit-modal"));
  document.getElementById("btn-cta-header")?.addEventListener("click",      () => openModal("visit-modal"));
  document.getElementById("btn-login")?.addEventListener("click",           () => openModal("visit-modal"));

  document.querySelectorAll(".open-b2b-modal").forEach(btn =>
    btn.addEventListener("click", e => { e.preventDefault(); openModal("b2b-modal"); }));

  document.querySelectorAll(".modal-close").forEach(btn =>
    btn.addEventListener("click", () => closeModal(btn.closest(".modal-overlay").id)));

  document.querySelectorAll(".modal-overlay").forEach(overlay =>
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(overlay.id); }));

  document.getElementById("btn-explore")?.addEventListener("click", () =>
    document.getElementById("smart-tools")?.scrollIntoView({ behavior: "smooth" }));

  const mBtn = document.getElementById("mobile-menu-btn");
  mBtn?.addEventListener("click", () => document.getElementById("mobile-nav")?.classList.toggle("hidden"));

  // ESC closes modals
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") document.querySelectorAll(".modal-overlay.active").forEach(m => closeModal(m.id));
  });
}

// === SCROLL ANIMATIONS ===
function setupScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-in-up").forEach(el => obs.observe(el));

  // Counter animation
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const dur = 1800, start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = (Number.isInteger(target) ? Math.floor(p * target) : (p * target).toFixed(1)) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-counter").forEach(el => cObs.observe(el));
}

document.addEventListener("DOMContentLoaded", init);
