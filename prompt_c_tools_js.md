# PROMPT C — tools.js (Calculator Logic)

Copy-paste this into a separate AI chat.

---

```
You are a Mechatronics Engineer writing pure JavaScript for "ilios", an Egyptian golf cart maintenance company. Create ONE file: src/js/tools.js

This file contains ONLY pure computation functions. NO DOM access. NO global variables. NO external dependencies.

---

### FUNCTION 1: calcSOH(batteryType, nominalVoltage, voltageAfterLoad, distanceOnFullCharge)

/**
 * Calculates Battery State of Health (SOH) as a percentage.
 * @param {string} batteryType - "lead_acid" or "lithium"
 * @param {number} nominalVoltage - Battery nominal voltage (e.g. 48V)
 * @param {number} voltageAfterLoad - Voltage measured after 1km run under load
 * @param {number} distanceOnFullCharge - km traveled on a full charge
 * @returns {{ soh: number|null, status: string, color: string, statusKey: string }}
 */

LOGIC:
- Constants by batteryType:
  - lead_acid: ratedRange = 80 km, maxVoltageDrop = nominalVoltage * 0.15
  - lithium:   ratedRange = 120 km, maxVoltageDrop = nominalVoltage * 0.10
- actualVoltageDrop = nominalVoltage - voltageAfterLoad
- rangeFactor = Math.min(distanceOnFullCharge / ratedRange, 1.0)
- voltageFactor = Math.max(0, Math.min(1, 1 - (actualVoltageDrop / maxVoltageDrop)))
- soh = (rangeFactor * 0.7 + voltageFactor * 0.3) * 100
- Clamp soh between 0 and 100, round to 1 decimal.
- statusKey (for i18n lookup in data.json):
  - soh >= 85 → "excellent", color: "#74C69D"
  - soh >= 70 → "good",      color: "#74C69D"
  - soh >= 50 → "fair",      color: "#FFD700"
  - soh >= 30 → "poor",      color: "#E63946"
  - soh <  30 → "critical",  color: "#E63946"
- VALIDATION: If any param is missing, NaN, or negative, OR voltageAfterLoad >= nominalVoltage:
  return { soh: null, status: "Invalid Input", statusKey: "invalid", color: "#6B7280" }

---

### FUNCTION 2: calcROI(fleetSize, avgMonthlyBreakdownCostPerCart)

/**
 * Calculates ROI of ilios Proactive Maintenance vs Reactive repairs.
 * @param {number} fleetSize - Number of carts in fleet
 * @param {number} avgMonthlyBreakdownCostPerCart - Average monthly reactive repair cost per cart (EGP)
 * @returns {{ annualReactiveCost: number, annualIliosCost: number, annualSavings: number, roi: number, batterySavings: number } | null}
 */

LOGIC (all costs in EGP):
- CONSTANTS:
  - ILIOS_MONTHLY_PM_COST_PER_CART = 1500
  - DOWNTIME_COST_PER_INCIDENT = 500
  - AVG_INCIDENTS_PER_CART_PER_YEAR = 4
  - BATTERY_SET_COST = 15000
  - BATTERY_LIFE_EXTENSION = 0.25
- annualReactiveCost = fleetSize * ((avgMonthlyBreakdownCostPerCart * 12) + (DOWNTIME_COST_PER_INCIDENT * AVG_INCIDENTS_PER_CART_PER_YEAR))
- annualIliosCost = fleetSize * ILIOS_MONTHLY_PM_COST_PER_CART * 12
- batterySavings = fleetSize * BATTERY_SET_COST * BATTERY_LIFE_EXTENSION
- annualSavings = annualReactiveCost - annualIliosCost + batterySavings
- roi = parseFloat(((annualSavings / annualIliosCost) * 100).toFixed(1))
- Return: { annualReactiveCost, annualIliosCost, annualSavings, roi, batterySavings }
- VALIDATION: If fleetSize < 1 OR avgMonthlyBreakdownCostPerCart <= 0 OR either is NaN → return null

---

### EXPORTS & SELF-TEST:

Use ES6 named exports:
  export { calcSOH, calcROI };

At the bottom, add a self-test block that only runs in Node.js (not browser):
  if (typeof window === 'undefined') {
    // Test calcSOH
    console.log("SOH Test 1 (Lithium, healthy):", calcSOH("lithium", 48, 46.5, 110));
    console.log("SOH Test 2 (Lead Acid, poor):", calcSOH("lead_acid", 48, 44, 55));
    console.log("SOH Test 3 (invalid):", calcSOH("lead_acid", 48, 50, 80)); // voltageAfter > nominal
    // Test calcROI
    console.log("ROI Test 1 (fleet=10):", calcROI(10, 3000));
    console.log("ROI Test 2 (fleet=50):", calcROI(50, 5000));
    console.log("ROI Test 3 (invalid):", calcROI(0, 3000));
  }

### CONSTRAINTS:
- Pure functions only. No DOM access. No fetch. No global state.
- All calculations in EGP.
- Output ONLY the src/js/tools.js file content.
```
