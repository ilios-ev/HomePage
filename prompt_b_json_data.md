# PROMPT B — Bilingual JSON Data Structure

Copy-paste this into a separate AI chat.

---

```
You are a Content Architect building src/data.json for "ilios", a bilingual (English + Arabic) golf cart smart maintenance ecosystem website based in Egypt. This JSON is the SINGLE SOURCE OF TRUTH for all displayed text.

### STRUCTURE RULE:
Every user-facing string must be an object with "en" and "ar" keys:
  "headline": { "en": "English text", "ar": "النص بالعربي" }

### TOP-LEVEL SCHEMA:

{
  "meta": {
    "title": { "en": "...", "ar": "..." },
    "description": { "en": "...", "ar": "..." }
  },
  "nav": {
    "logo_text": { "en": "ilios", "ar": "ilios" },
    "links": [
      { "label": { "en": "...", "ar": "..." }, "href": "#section-id" }
    ],
    "btn_login_text": { "en": "...", "ar": "..." },
    "btn_cta_text": { "en": "...", "ar": "..." },
    "lang_toggle": { "en": "عربي", "ar": "EN" }
  },
  "hero": {
    "headline": { "en": "...", "ar": "..." },
    "subheadline": { "en": "...", "ar": "..." },
    "cta_primary_text": { "en": "...", "ar": "..." },
    "cta_secondary_text": { "en": "...", "ar": "..." }
  },
  "smart_tools": {
    "section_title": { "en": "...", "ar": "..." },
    "section_subtitle": { "en": "...", "ar": "..." },
    "soh": {
      "card_title": { "en": "...", "ar": "..." },
      "card_description": { "en": "...", "ar": "..." },
      "input_labels": {
        "battery_type": { "en": "...", "ar": "..." },
        "nominal_voltage": { "en": "...", "ar": "..." },
        "voltage_after_load": { "en": "...", "ar": "..." },
        "distance": { "en": "...", "ar": "..." }
      },
      "battery_types": [
        { "value": "lead_acid", "label": { "en": "Lead Acid", "ar": "رصاص حمضية" } },
        { "value": "lithium", "label": { "en": "Lithium", "ar": "ليثيوم" } }
      ],
      "btn_text": { "en": "...", "ar": "..." },
      "result_prefix": { "en": "...", "ar": "..." },
      "statuses": {
        "excellent": { "en": "Excellent", "ar": "ممتازة" },
        "good": { "en": "Good", "ar": "جيدة" },
        "fair": { "en": "Fair", "ar": "مقبولة" },
        "poor": { "en": "Poor", "ar": "ضعيفة" },
        "critical": { "en": "Critical", "ar": "حرجة" }
      },
      "cta_hook": { "en": "...", "ar": "..." }
    },
    "roi": {
      "card_title": { "en": "...", "ar": "..." },
      "card_description": { "en": "...", "ar": "..." },
      "input_labels": {
        "fleet_size": { "en": "...", "ar": "..." },
        "breakdown_cost": { "en": "...", "ar": "..." }
      },
      "btn_text": { "en": "...", "ar": "..." },
      "result_labels": {
        "reactive_cost": { "en": "...", "ar": "..." },
        "ilios_cost": { "en": "...", "ar": "..." },
        "annual_savings": { "en": "...", "ar": "..." },
        "roi_percent": { "en": "...", "ar": "..." },
        "battery_savings": { "en": "...", "ar": "..." }
      },
      "cta_hook": { "en": "...", "ar": "..." }
    }
  },
  "services": {
    "section_title": { "en": "...", "ar": "..." },
    "section_subtitle": { "en": "...", "ar": "..." },
    "b2c": {
      "group_title": { "en": "...", "ar": "..." },
      "cards": [
        { "icon": "emoji_or_svg_name", "title": { "en": "...", "ar": "..." }, "description": { "en": "...", "ar": "..." } }
      ]
    },
    "b2b": {
      "group_title": { "en": "...", "ar": "..." },
      "cards": [
        { "icon": "emoji_or_svg_name", "title": { "en": "...", "ar": "..." }, "description": { "en": "...", "ar": "..." } }
      ]
    }
  },
  "trust": {
    "section_title": { "en": "...", "ar": "..." },
    "vigorey": { "badge_alt": { "en": "...", "ar": "..." }, "description": { "en": "...", "ar": "..." } },
    "stats": [
      { "value": "650", "suffix": "+", "label": { "en": "...", "ar": "..." } }
    ],
    "linkedin": { "title": { "en": "...", "ar": "..." }, "placeholder_text": { "en": "...", "ar": "..." } }
  },
  "coverage": {
    "section_title": { "en": "...", "ar": "..." },
    "section_subtitle": { "en": "...", "ar": "..." },
    "locations": [
      { "name": { "en": "Cairo", "ar": "القاهرة" }, "icon": "🏙️" }
    ],
    "nationwide_note": { "en": "...", "ar": "..." }
  },
  "partner": {
    "section_title": { "en": "...", "ar": "..." },
    "section_subtitle": { "en": "...", "ar": "..." },
    "form": {
      "fields": [
        { "name": "name", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "company", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "phone", "type": "tel", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "email", "type": "email", "placeholder": { "en": "...", "ar": "..." } }
      ],
      "partner_types": [
        { "value": "manufacturer", "label": { "en": "Manufacturer", "ar": "مصنع" } },
        { "value": "dealer", "label": { "en": "Dealer", "ar": "موزع" } },
        { "value": "supplier", "label": { "en": "Supplier", "ar": "مورد" } },
        { "value": "tech", "label": { "en": "Tech Partner", "ar": "شريك تقني" } }
      ],
      "btn_text": { "en": "...", "ar": "..." },
      "success_msg": { "en": "...", "ar": "..." },
      "error_msg": { "en": "...", "ar": "..." }
    }
  },
  "footer": {
    "contact": {
      "label": { "en": "...", "ar": "..." },
      "manager": "Eng. Abdelrahman Mostafa",
      "phone": "01008602509",
      "email": "ilios.ev.eg@gmail.com",
      "whatsapp": "https://wa.me/201008602509"
    },
    "quick_links": [
      { "label": { "en": "...", "ar": "..." }, "href": "#section-id" }
    ],
    "social": [
      { "platform": "LinkedIn", "url": "https://www.linkedin.com/company/ilios-ev/", "icon": "linkedin" },
      { "platform": "Facebook", "url": "https://www.facebook.com/share/1A3F81HHJe/", "icon": "facebook" },
      { "platform": "WhatsApp", "url": "https://wa.me/201008602509", "icon": "whatsapp" }
    ],
    "copyright": { "en": "© 2026 ilios. All rights reserved.", "ar": "© 2026 ilios. جميع الحقوق محفوظة." }
  },
  "modals": {
    "visit": {
      "title": { "en": "...", "ar": "..." },
      "fields": [
        { "name": "name", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "phone", "type": "tel", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "cart_brand", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "preferred_date", "type": "date", "placeholder": { "en": "...", "ar": "..." } }
      ],
      "locations": [
        { "value": "cairo", "label": { "en": "Cairo", "ar": "القاهرة" } },
        { "value": "giza", "label": { "en": "Giza", "ar": "الجيزة" } },
        { "value": "sokhna", "label": { "en": "Ein Sokhna", "ar": "العين السخنة" } },
        { "value": "north_coast", "label": { "en": "North Coast", "ar": "الساحل الشمالي" } }
      ],
      "btn_text": { "en": "...", "ar": "..." },
      "success_msg": { "en": "...", "ar": "..." },
      "error_msg": { "en": "...", "ar": "..." }
    },
    "b2b_quote": {
      "title": { "en": "...", "ar": "..." },
      "fields": [
        { "name": "company", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "contact_person", "type": "text", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "phone", "type": "tel", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "fleet_size", "type": "number", "placeholder": { "en": "...", "ar": "..." } },
        { "name": "message", "type": "textarea", "placeholder": { "en": "...", "ar": "..." } }
      ],
      "btn_text": { "en": "...", "ar": "..." },
      "success_msg": { "en": "...", "ar": "..." },
      "error_msg": { "en": "...", "ar": "..." }
    }
  }
}

### CONTENT DETAILS:
- Hero headline: "Beyond Maintenance: A Smart Ecosystem for Golf Carts" / "ما وراء الصيانة: منظومة ذكية لعربات الجولف"
- Hero subheadline: "We Bring Smooth Rides to You" / "نأتي إليك براحة القيادة"
- Company: ilios (always lowercase 'i' in both languages).
- Use professional, engineering-grade tone in both languages.
- Arabic must be natural and fluent, not machine-translated.
- B2C services: Quick Service & Repairs, Battery Solutions, Technical Cleaning, Proactive Maintenance.
- B2B services: Fleet Management Dashboard, Annual Contracts, Digital Diagnostics, Dedicated Account Manager.
- Nav links should point to: #smart-tools, #services, #trust, #coverage, #partner.
- SOH cta_hook: "Your battery needs attention. Book a free 7-Axis Audit now."
- ROI cta_hook: "See how much you could save. Request a custom fleet quote."
- Keep card descriptions to 1-2 concise sentences.

### CONSTRAINTS:
- Output ONLY valid JSON. No markdown code fences, no comments.
- Every user-facing string MUST have both "en" and "ar" values.
- Fill in ALL "..." placeholders with actual content. Do not leave any empty.
```
