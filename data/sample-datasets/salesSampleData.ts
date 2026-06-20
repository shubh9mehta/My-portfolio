import { createSeededRandom } from "@/lib/seededRandom";

export interface SalesRow {
  region: "North" | "South" | "West";
  segment: "Enterprise" | "SMB";
  product: string;
  month: string; // "Jan" - "Dec"
  revenue: number;
  margin: number; // percentage, 10-35
  unitsSold: number;
}

const rand = createSeededRandom(7);

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const regions: SalesRow["region"][] = ["North", "South", "West"];
const segments: SalesRow["segment"][] = ["Enterprise", "SMB"];
const products = ["ProLine Servers", "EdgeKit Sensors", "FlexMount Racks"];

// Underperforming combo (per spec): South + SMB consistently low margin
function marginFor(region: SalesRow["region"], segment: SalesRow["segment"]): number {
  if (region === "South" && segment === "SMB") {
    return rand.range(10, 16);
  }
  if (segment === "Enterprise") {
    return rand.range(24, 35);
  }
  return rand.range(17, 26);
}

function baseRevenueFor(region: SalesRow["region"], segment: SalesRow["segment"]): number {
  const regionFactor = region === "North" ? 1.3 : region === "West" ? 1.1 : 0.85;
  const segmentFactor = segment === "Enterprise" ? 1.6 : 1.0;
  return 40000 * regionFactor * segmentFactor;
}

export const salesSampleData: SalesRow[] = [];

for (const region of regions) {
  for (const segment of segments) {
    for (const month of months) {
      const product = rand.pick(products);
      const seasonality = 1 + 0.15 * Math.sin((months.indexOf(month) / 12) * Math.PI * 2);
      const revenue = Math.round(baseRevenueFor(region, segment) * seasonality * rand.range(0.9, 1.1));
      const margin = Math.round(marginFor(region, segment) * 10) / 10;
      const unitsSold = Math.round(revenue / rand.range(800, 1400));

      salesSampleData.push({
        region,
        segment,
        product,
        month,
        revenue,
        margin,
        unitsSold,
      });
    }
  }
}
