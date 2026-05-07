/**
 * ilios Smart Tools — Advanced Battery Diagnostic Engine
 */

/**
 * Calculates Battery State of Health (SOH) using the Ilios Engineering Model.
 * @param {Object} inputs - All user inputs for the diagnostic
 * @returns {Object} result - Diagnostic metrics and status
 */
function calcSOH(inputs) {
  const {
    batteryType, nominalVoltage, capacity, ageMonths,
    socBefore, voltageBefore, socAfter, voltageAfter,
    voltageUnderLoad, distance, expectedRangeNew
  } = inputs;

  // STEP 1: Validate Inputs
  if (socBefore <= socAfter || distance <= 0) {
    return { error: true, message: "Invalid SOC drop or distance" };
  }

  const isLowAccuracy = (socBefore - socAfter) < 10;

  // STEP 2: SOC Drop
  const socDrop = socBefore - socAfter;

  // STEP 3: Determine Nominal Range
  let nominalRange = expectedRangeNew;
  if (!nominalRange || isNaN(nominalRange)) {
    const energyKWh = (nominalVoltage * capacity) / 1000;
    const efficiencyFactor = batteryType === 'lithium' ? 13 : 9;
    nominalRange = energyKWh * efficiencyFactor;
  }

  // STEP 4: Expected Distance Based on SOC Used
  const expectedDistance = (socDrop / 100) * nominalRange;

  // STEP 5: Range Health (%)
  let rangeHealth = (distance / expectedDistance) * 100;
  rangeHealth = Math.max(0, Math.min(120, rangeHealth));

  // STEP 6: Voltage Stress Score
  const voltageDrop = voltageBefore - voltageUnderLoad;
  const normalizedDrop = voltageDrop / nominalVoltage;
  let stressScore = 100 - (150 * normalizedDrop);
  stressScore = Math.max(0, Math.min(100, stressScore));

  // STEP 7: Age Factor
  const expectedLife = batteryType === 'lithium' ? 72 : 24;
  const ageFactor = (ageMonths / expectedLife) * 100;

  // STEP 8: State of Health (SOH %)
  // Weighted: 50% Range, 30% Stress, -20% Age penalty
  let soh = (0.5 * rangeHealth) + (0.3 * stressScore) - (0.2 * ageFactor);
  soh = Math.max(0, Math.min(100, soh));

  // STEP 9: Consumption per KM (% per km)
  const consumptionPerKm = socDrop / distance;

  // STEP 10: Status Classification
  let statusKey = "replace";
  let color = "#E63946"; // Red

  if (soh >= 85) {
    statusKey = "excellent";
    color = "#74C69D"; // Forest/Lime
  } else if (soh >= 70) {
    statusKey = "good";
    color = "#95D5B2"; // Soft Green
  } else if (soh >= 50) {
    statusKey = "needs_attention";
    color = "#FFD700"; // Gold
  } else if (soh >= 30) {
    statusKey = "weak";
    color = "#F4A261"; // Orange
  }

  return {
    soh: parseFloat(soh.toFixed(1)),
    rangeHealth: parseFloat(rangeHealth.toFixed(1)),
    stressScore: parseFloat(stressScore.toFixed(1)),
    consumption: parseFloat(consumptionPerKm.toFixed(2)),
    statusKey,
    color,
    isLowAccuracy
  };
}

/**
 * Calculates ROI of ilios Proactive Maintenance vs Reactive repairs.
 */
function calcROI(fleetSize, avgMonthlyBreakdownCostPerCart) {
  if (
    typeof fleetSize !== 'number' || isNaN(fleetSize) || fleetSize < 1 ||
    typeof avgMonthlyBreakdownCostPerCart !== 'number' || isNaN(avgMonthlyBreakdownCostPerCart) || avgMonthlyBreakdownCostPerCart <= 0
  ) {
    return null;
  }

  const ILIOS_MONTHLY_PM_COST_PER_CART = 1500;
  const DOWNTIME_COST_PER_INCIDENT = 500;
  const AVG_INCIDENTS_PER_CART_PER_YEAR = 4;
  const BATTERY_SET_COST = 15000;
  const BATTERY_LIFE_EXTENSION = 0.25;

  const annualReactiveCost = fleetSize * ((avgMonthlyBreakdownCostPerCart * 12) + (DOWNTIME_COST_PER_INCIDENT * AVG_INCIDENTS_PER_CART_PER_YEAR));
  const annualIliosCost    = fleetSize * ILIOS_MONTHLY_PM_COST_PER_CART * 12;
  const batterySavings     = fleetSize * BATTERY_SET_COST * BATTERY_LIFE_EXTENSION;
  const annualSavings      = annualReactiveCost - annualIliosCost + batterySavings;
  const roi                = parseFloat(((annualSavings / annualIliosCost) * 100).toFixed(1));

  return { annualReactiveCost, annualIliosCost, annualSavings, roi, batterySavings };
}
