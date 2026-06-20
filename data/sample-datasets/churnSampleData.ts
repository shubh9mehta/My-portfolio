import { createSeededRandom } from "@/lib/seededRandom";

export interface ChurnRow {
  customerId: string;
  tenureMonths: number;
  monthlyCharges: number;
  contractType: "Month-to-month" | "One year" | "Two year";
  churnRiskScore: number; // 0-100
  churned: boolean;
  topDriver: string;
}

const rand = createSeededRandom(99);

const contractTypes: ChurnRow["contractType"][] = [
  "Month-to-month",
  "One year",
  "Two year",
];

const drivers = [
  "High monthly charges",
  "Short tenure",
  "Month-to-month contract",
  "Low engagement",
];

function driverFor(contractType: ChurnRow["contractType"], tenureMonths: number, monthlyCharges: number): string {
  if (contractType === "Month-to-month") return "Month-to-month contract";
  if (tenureMonths < 6) return "Short tenure";
  if (monthlyCharges > 85) return "High monthly charges";
  return rand.pick(drivers);
}

export const churnSampleData: ChurnRow[] = Array.from({ length: 60 }, (_, i) => {
  // Bias contract type distribution: month-to-month customers are more common and risk-prone
  const contractRoll = rand.next();
  const contractType: ChurnRow["contractType"] =
    contractRoll < 0.5 ? "Month-to-month" : contractRoll < 0.8 ? "One year" : "Two year";

  const tenureBase =
    contractType === "Month-to-month"
      ? rand.range(1, 24)
      : contractType === "One year"
      ? rand.range(6, 48)
      : rand.range(18, 72);
  const tenureMonths = Math.round(tenureBase);

  const monthlyCharges = Math.round(rand.range(25, 120) * 100) / 100;

  // Risk score correlates with month-to-month + short tenure + high charges
  let riskScore = 20;
  if (contractType === "Month-to-month") riskScore += 35;
  if (contractType === "One year") riskScore += 12;
  riskScore += Math.max(0, 24 - tenureMonths) * 1.5;
  riskScore += Math.max(0, monthlyCharges - 70) * 0.4;
  riskScore += rand.range(-8, 8);
  riskScore = Math.max(2, Math.min(98, Math.round(riskScore)));

  const churned = riskScore > 65 ? rand.next() < 0.7 : rand.next() < 0.1;

  return {
    customerId: `CUST-${String(1000 + i)}`,
    tenureMonths,
    monthlyCharges,
    contractType,
    churnRiskScore: riskScore,
    churned,
    topDriver: driverFor(contractType, tenureMonths, monthlyCharges),
  };
});
