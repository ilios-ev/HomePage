/**
 * ilios Smart Tools — Advanced Battery Diagnostic Engine
 */

/**
 * Calculates Battery State of Health (SOH) using the advanced engineering logic.
 */
function calcSOH(
  batteryType,
  nominalVoltage,
  capacityAh,
  batteryAgeMonths,
  socBefore,
  voltageBefore,
  socAfter,
  voltageAfter,
  voltageUnderLoad,
  distanceDriven,
  expectedRange
) {
  // Step 1: Validate Inputs
  if (
    typeof nominalVoltage !== 'number' || isNaN(nominalVoltage) || nominalVoltage <= 0 ||
    typeof capacityAh !== 'number' || isNaN(capacityAh) || capacityAh <= 0 ||
    typeof batteryAgeMonths !== 'number' || isNaN(batteryAgeMonths) || batteryAgeMonths < 0 ||
    typeof socBefore !== 'number' || isNaN(socBefore) || socBefore < 0 || socBefore > 100 ||
    typeof socAfter !== 'number' || isNaN(socAfter) || socAfter < 0 || socAfter > 100 ||
    typeof voltageBefore !== 'number' || isNaN(voltageBefore) || voltageBefore <= 0 ||
    typeof voltageUnderLoad !== 'number' || isNaN(voltageUnderLoad) || voltageUnderLoad <= 0 ||
    typeof distanceDriven !== 'number' || isNaN(distanceDriven) || distanceDriven <= 0 ||
    (batteryType !== "lead_acid" && batteryType !== "lithium")
  ) {
    return { error: true, status: "Invalid Input", statusKey: "invalid", color: "#6B7280" };
  }

  const socDrop = socBefore - socAfter;
  
  if (socDrop <= 0) {
    return { error: true, status: "Invalid SOC Drop", statusKey: "invalid", color: "#6B7280" };
  }
  
  let confidence = "High";
  if (socDrop < 10) {
    confidence = "Low";
  }

  // Step 3: Determine Nominal Range
  let nominalRange = expectedRange;
  if (!nominalRange || isNaN(nominalRange) || nominalRange <= 0) {
    const energyKWh = (nominalVoltage * capacityAh) / 1000;
    const efficiencyFactor = batteryType === "lead_acid" ? 9 : 13;
    nominalRange = energyKWh * efficiencyFactor;
  }

  // Step 4: Expected Distance Based on SOC Used
  const expectedDistance = (socDrop / 100) * nominalRange;

  // Step 5: Range Health (%)
  let rangeHealth = (distanceDriven / expectedDistance) * 100;
  rangeHealth = Math.min(120, Math.max(0, rangeHealth)); // Clamp between 0 and 120

  // Step 6: Voltage Stress Score
  const voltageDrop = voltageBefore - voltageUnderLoad;
  const normalizedDrop = voltageDrop / nominalVoltage;
  const stressCoefficient = batteryType === "lead_acid" ? 150 : 250;
  let stressScore = 100 - (stressCoefficient * normalizedDrop);
  stressScore = Math.min(100, Math.max(0, stressScore)); // Clamp between 0 and 100

  // Step 7: Age Factor
  const expectedLife = batteryType === "lead_acid" ? 24 : 72;
  const ageFactor = (batteryAgeMonths / expectedLife) * 100;

  // Step 8: State of Health (SOH %)
  let soh = 0;
  if (batteryType === "lead_acid") {
    soh = (0.50 * rangeHealth) + (0.30 * stressScore) - (0.20 * ageFactor);
  } else {
    soh = (0.75 * rangeHealth) + (0.15 * stressScore) - (0.10 * ageFactor);
  }
  soh = parseFloat(Math.min(100, Math.max(0, soh)).toFixed(1));

  // Step 9: Consumption per KM
  const consumptionPerKm = parseFloat((socDrop / distanceDriven).toFixed(2));

  // Step 10: Status Classification
  let statusKey, color;
  if (soh >= 85) { statusKey = "excellent"; color = "#74C69D"; }
  else if (soh >= 70) { statusKey = "good"; color = "#95D5B2"; }
  else if (soh >= 50) { statusKey = "needs_attention"; color = "#FFD700"; }
  else if (soh >= 30) { statusKey = "weak"; color = "#F4A261"; }
  else { statusKey = "replace"; color = "#E63946"; }

  return {
    error: false,
    soh,
    rangeHealth: parseFloat(rangeHealth.toFixed(1)),
    stressScore: parseFloat(stressScore.toFixed(1)),
    consumptionPerKm,
    statusKey,
    color,
    confidence
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
