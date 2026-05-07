const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = {
  'nav.links.smart_tools': 'nav.links_smart_tools',
  'nav.links.services': 'nav.links_services',
  'nav.links.trust': 'nav.links_trust',
  'nav.links.coverage': 'nav.links_coverage',
  'nav.links.partner': 'nav.links_partner',
  
  'smart_tools.soh.title': 'smart_tools.soh.title',
  'smart_tools.soh.battery_type_label': 'smart_tools.soh.battery_type_label',
  'smart_tools.soh.battery_lead_acid': 'smart_tools.soh.battery_lead_acid',
  'smart_tools.soh.battery_lithium': 'smart_tools.soh.battery_lithium',
  'smart_tools.soh.voltage_label': 'smart_tools.soh.voltage_label',
  'smart_tools.soh.voltage_after_label': 'smart_tools.soh.voltage_after_label',
  'smart_tools.soh.distance_label': 'smart_tools.soh.distance_label',
  'smart_tools.soh.calculate_btn': 'smart_tools.soh.calculate_btn',

  'smart_tools.roi.title': 'smart_tools.roi.title',
  'smart_tools.roi.fleet_size_label': 'smart_tools.roi.fleet_size_label',
  'smart_tools.roi.breakdown_cost_label': 'smart_tools.roi.breakdown_cost_label',
  'smart_tools.roi.calculate_btn': 'smart_tools.roi.calculate_btn',

  'services.b2c_title': 'services.b2c_title',
  'services.b2b_title': 'services.b2b_title',

  'trust.stats.clients': 'trust.stats_clients',
  'trust.stats.satisfaction': 'trust.stats_satisfaction',
  'trust.stats.support': 'trust.stats_support',

  'partner.form.name_label': 'partner.form.name_label',
  'partner.form.company_label': 'partner.form.company_label',
  'partner.form.phone_label': 'partner.form.phone_label',
  'partner.form.email_label': 'partner.form.email_label',
  'partner.form.partner_type_label': 'partner.form.partner_type_label',

  'footer.contact.address': 'footer.contact_address',
  'footer.contact.email': 'footer.contact_email',
  'footer.contact.phone': 'footer.contact_phone',
  'footer.quick_links.title': 'footer.quick_links_title',

  'modals.visit.form.name_label': 'modals.visit.form_name_label',
  'modals.visit.form.phone_label': 'modals.visit.form_phone_label',
  'modals.visit.form.location_label': 'modals.visit.form_location_label',
  'modals.visit.form.cart_brand_label': 'modals.visit.form_cart_brand_label',
  'modals.visit.form.date_label': 'modals.visit.form_date_label',
  'modals.visit.form.btn_text': 'modals.visit.form_btn_text',

  'modals.b2b_quote.form.company_label': 'modals.b2b_quote.form_company_label',
  'modals.b2b_quote.form.contact_label': 'modals.b2b_quote.form_contact_label',
  'modals.b2b_quote.form.phone_label': 'modals.b2b_quote.form_phone_label',
  'modals.b2b_quote.form.fleet_size_label': 'modals.b2b_quote.form_fleet_size_label',
  'modals.b2b_quote.form.message_label': 'modals.b2b_quote.form_message_label',
  'modals.b2b_quote.form.btn_text': 'modals.b2b_quote.form_btn_text',
};

for (const [oldVal, newVal] of Object.entries(replacements)) {
  html = html.split(`"${oldVal}"`).join(`"${newVal}"`);
}

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
