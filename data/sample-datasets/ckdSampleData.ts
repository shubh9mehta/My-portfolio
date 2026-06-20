import { createSeededRandom } from "@/lib/seededRandom";

export interface CkdRow {
  patientId: string;
  age: number;
  bloodPressure: number; // mm Hg, diastolic-ish single value for simplicity
  bloodGlucoseRandom: number; // mg/dL
  serumCreatinine: number; // mg/dL
  hemoglobin: number; // g/dL
  riskScore: number; // 0-100
  predictedClass: "CKD" | "No CKD";
}

export interface ShapFeatureImportance {
  feature: string;
  importance: number; // 0-1
  direction: "increases" | "decreases";
}

const rand = createSeededRandom(2024);

export const ckdSampleData: CkdRow[] = Array.from({ length: 50 }, (_, i) => {
  const age = Math.round(rand.range(28, 82));
  const serumCreatinine = Math.round(rand.range(0.6, 6.5) * 100) / 100;
  const bloodPressure = Math.round(rand.range(60, 110));
  const bloodGlucoseRandom = Math.round(rand.range(70, 260));
  const hemoglobin = Math.round(rand.range(8, 16.5) * 10) / 10;

  // Clinically plausible risk composition: higher creatinine/BP/glucose/age increase
  // risk, higher hemoglobin decreases it.
  let riskScore =
    (serumCreatinine - 0.6) * 9 +
    Math.max(0, bloodPressure - 80) * 0.6 +
    Math.max(0, bloodGlucoseRandom - 100) * 0.12 +
    Math.max(0, age - 40) * 0.35 -
    Math.max(0, hemoglobin - 12) * 4;

  riskScore += rand.range(-6, 6);
  riskScore = Math.max(2, Math.min(98, Math.round(riskScore)));

  const predictedClass: CkdRow["predictedClass"] = riskScore >= 50 ? "CKD" : "No CKD";

  return {
    patientId: `PT-${String(2000 + i)}`,
    age,
    bloodPressure,
    bloodGlucoseRandom,
    serumCreatinine,
    hemoglobin,
    riskScore,
    predictedClass,
  };
});

export const shapFeatureImportances: ShapFeatureImportance[] = [
  { feature: "Serum Creatinine", importance: 0.92, direction: "increases" },
  { feature: "Hemoglobin", importance: 0.78, direction: "decreases" },
  { feature: "Blood Pressure", importance: 0.61, direction: "increases" },
  { feature: "Age", importance: 0.54, direction: "increases" },
  { feature: "Blood Glucose (Random)", importance: 0.47, direction: "increases" },
  { feature: "Albumin Levels", importance: 0.33, direction: "increases" },
];

// NOTE: All patient records above are synthetic and illustrative only —
// generated via a seeded PRNG for demo purposes, not real clinical data.
