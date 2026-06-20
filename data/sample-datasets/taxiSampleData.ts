import { createSeededRandom } from "@/lib/seededRandom";

export interface TaxiHourlyRow {
  pickupHour: number;
  pickupZone: string;
  totalRevenue: number; // in thousands of dollars
  tripCount: number;
  avgFare: number;
}

export interface TaxiZoneRevenueRow {
  zone: string;
  totalRevenue: number; // in thousands of dollars
  tripCount: number;
}

const rand = createSeededRandom(42);

const zonesCycle = ["Manhattan", "JFK Airport", "Brooklyn", "Queens", "Bronx"];

// Revenue weighting curve: peaks at morning (7-9) and evening (17-19) rush,
// dips overnight (0-5).
function hourWeight(hour: number): number {
  if (hour >= 7 && hour <= 9) return 1.8;
  if (hour >= 17 && hour <= 19) return 2.0;
  if (hour >= 10 && hour <= 16) return 1.2;
  if (hour >= 20 && hour <= 22) return 1.0;
  return 0.35; // overnight 23,0-6
}

const baseRevenuePerHour = 175; // thousands, before weighting

export const taxiSampleData: TaxiHourlyRow[] = Array.from({ length: 24 }, (_, hour) => {
  const weight = hourWeight(hour);
  const jitter = rand.range(0.92, 1.08);
  const totalRevenue = Math.round(baseRevenuePerHour * weight * jitter);
  const avgFare = Math.round(rand.range(14, 26) * 100) / 100;
  const tripCount = Math.round((totalRevenue * 1000) / avgFare);

  return {
    pickupHour: hour,
    pickupZone: zonesCycle[hour % zonesCycle.length],
    totalRevenue,
    tripCount,
    avgFare,
  };
});

// ~6-row zone summary table, scaled so the grand total lands around $4M+
const zoneShares: { zone: string; share: number }[] = [
  { zone: "Manhattan", share: 0.42 },
  { zone: "JFK Airport", share: 0.22 },
  { zone: "Brooklyn", share: 0.16 },
  { zone: "Queens", share: 0.12 },
  { zone: "Bronx", share: 0.05 },
  { zone: "Staten Island", share: 0.03 },
];

const GRAND_TOTAL_REVENUE_K = 4150; // ~$4.15M, in thousands

export const taxiZoneRevenue: TaxiZoneRevenueRow[] = zoneShares.map(({ zone, share }) => {
  const totalRevenue = Math.round(GRAND_TOTAL_REVENUE_K * share);
  const avgFare = rand.range(15, 24);
  const tripCount = Math.round((totalRevenue * 1000) / avgFare);
  return { zone, totalRevenue, tripCount };
});
