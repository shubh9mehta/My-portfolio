// Illustrative SKU reconciliation data for the flagship case study
// (Macrotech — supply chain inventory reconciliation across 400+ SKUs).

export interface ReconRow {
  sku: string;
  system: number; // system-of-record count
  countedRaw: string; // messy warehouse count as it arrives (strings, blanks, errors)
  counted: number; // cleaned numeric count
}

export const reconRows: ReconRow[] = [
  { sku: "SKU-1042", system: 1200, countedRaw: "1,040", counted: 1196 },
  { sku: "SKU-2371", system: 860, countedRaw: " 905 ", counted: 858 },
  { sku: "SKU-3098", system: 540, countedRaw: "ERR", counted: 539 },
  { sku: "SKU-4415", system: 2310, countedRaw: "1980", counted: 2305 },
  { sku: "SKU-5567", system: 145, countedRaw: "", counted: 144 },
  { sku: "SKU-6720", system: 980, countedRaw: "1,210", counted: 977 },
];

export const RECON_SQL = `WITH raw AS (
  SELECT sku,
         system_count,
         -- strip commas, spaces, coerce blanks/errors to NULL
         SAFE_CAST(
           NULLIF(REGEXP_REPLACE(counted_raw, r'[^0-9]', ''), '')
           AS INT64
         ) AS counted
  FROM warehouse.daily_scan
),
reconciled AS (
  SELECT sku,
         system_count,
         COALESCE(counted, system_count) AS counted,
         system_count - COALESCE(counted, system_count) AS variance
  FROM raw
)
SELECT sku, system_count, counted, variance,
       ROUND(100 * ABS(variance) / system_count, 1) AS mismatch_pct
FROM reconciled
ORDER BY ABS(variance) DESC;`;
