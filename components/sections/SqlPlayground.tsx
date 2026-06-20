"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Play, Loader2, Database, AlertTriangle } from "lucide-react";
import { taxiSampleData } from "@/data/sample-datasets/taxiSampleData";
import { salesSampleData } from "@/data/sample-datasets/salesSampleData";
import { churnSampleData } from "@/data/sample-datasets/churnSampleData";
import SectionHeading from "@/components/ui/SectionHeading";
import { darkTooltipStyle, GlassSelect } from "./projects/dashboardChrome";

// Tables exposed to the in-browser engine + their column hints.
const TABLES: Record<string, { rows: Record<string, unknown>[]; columns: string[] }> = {
  trips: {
    rows: taxiSampleData as unknown as Record<string, unknown>[],
    columns: ["pickupHour", "pickupZone", "totalRevenue", "tripCount", "avgFare"],
  },
  sales: {
    rows: salesSampleData as unknown as Record<string, unknown>[],
    columns: ["region", "segment", "product", "month", "revenue", "margin", "unitsSold"],
  },
  churn: {
    rows: churnSampleData as unknown as Record<string, unknown>[],
    columns: ["customerId", "tenureMonths", "monthlyCharges", "contractType", "churnRiskScore", "churned", "topDriver"],
  },
};

const PRESETS: Record<string, { label: string; sql: string }[]> = {
  trips: [
    {
      label: "Revenue by zone",
      sql: "SELECT pickupZone, SUM(totalRevenue) AS revenue_k\nFROM trips\nGROUP BY pickupZone\nORDER BY revenue_k DESC",
    },
    {
      label: "Peak hours",
      sql: "SELECT pickupHour, totalRevenue\nFROM trips\nORDER BY totalRevenue DESC\nLIMIT 6",
    },
  ],
  sales: [
    {
      label: "Margin by segment",
      sql: "SELECT region, segment, ROUND(AVG(margin),1) AS avg_margin\nFROM sales\nGROUP BY region, segment\nORDER BY avg_margin ASC",
    },
    {
      label: "Revenue by region",
      sql: "SELECT region, ROUND(SUM(revenue)/1000) AS revenue_k\nFROM sales\nGROUP BY region\nORDER BY revenue_k DESC",
    },
  ],
  churn: [
    {
      label: "Risk by contract",
      sql: "SELECT contractType, COUNT(*) AS customers, ROUND(AVG(churnRiskScore),1) AS avg_risk\nFROM churn\nGROUP BY contractType\nORDER BY avg_risk DESC",
    },
    {
      label: "Top churn drivers",
      sql: "SELECT topDriver, COUNT(*) AS customers\nFROM churn\nGROUP BY topDriver\nORDER BY customers DESC",
    },
  ],
};

type ResultRow = Record<string, string | number | boolean | null>;

// Minimal shape of the AlaSQL engine we rely on.
type AlaSQL = ((sql: string) => unknown) & {
  tables: Record<string, { data: unknown[] }>;
};

export default function SqlPlayground() {
  const [dataset, setDataset] = useState<keyof typeof TABLES>("trips");
  const [query, setQuery] = useState(PRESETS.trips[0].sql);
  const [rows, setRows] = useState<ResultRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState<number | null>(null);

  async function run() {
    setRunning(true);
    setError(null);
    try {
      // Lazy-load the SQL engine so it never ships in the initial bundle / SSR.
      // (Node-only deps it references — fs / react-native — are stubbed out in
      // next.config.mjs so the in-memory engine bundles cleanly for the browser.)
      const mod = (await import("alasql")) as unknown as {
        default?: AlaSQL;
      } & AlaSQL;
      const alasql = mod.default ?? mod;

      // (Re)register every dataset as a real table so JOINs work too.
      for (const [name, def] of Object.entries(TABLES)) {
        alasql(`DROP TABLE IF EXISTS ${name}`);
        alasql(`CREATE TABLE ${name}`);
        alasql.tables[name].data = def.rows.map((r) => ({ ...r }));
      }

      const t0 = performance.now();
      const result = alasql(query);
      const t1 = performance.now();
      setMs(Math.max(1, Math.round(t1 - t0)));

      if (Array.isArray(result)) {
        setRows(result as ResultRow[]);
      } else {
        setRows([{ result: String(result) }]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Query failed");
      setRows(null);
      setMs(null);
    } finally {
      setRunning(false);
    }
  }

  function pickDataset(d: string) {
    const key = d as keyof typeof TABLES;
    setDataset(key);
    setQuery(PRESETS[key][0].sql);
    setRows(null);
    setError(null);
    setMs(null);
  }

  // Build a chart if the result has one label column + one numeric column.
  const cols = rows && rows.length ? Object.keys(rows[0]) : [];
  const labelCol = cols.find((c) => typeof rows?.[0]?.[c] === "string");
  const numCol = cols.find((c) => typeof rows?.[0]?.[c] === "number");
  const chartable = rows && rows.length > 0 && rows.length <= 12 && labelCol && numCol;

  return (
    <section id="playground" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Query It Yourself"
          title={
            <>
              Don&apos;t take my word for it — <span className="text-gradient">run the SQL.</span>
            </>
          }
          subtitle="A real SQL engine runs in your browser against my sample datasets. Edit the query, hit Run, and watch the results update live."
          plain="SQL is the language analysts use to ask data questions. Pick a dataset, click a sample question, hit Run — you'll see the answer appear. Nothing to install, you can't break anything."
          technical="A full SQL engine (AlaSQL) runs client-side over the in-memory sample tables — GROUP BY, aggregates, ROUND, ORDER BY and cross-table JOINs all execute live, with real error messages."
          className="mb-10"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Editor */}
          <div className="glass flex flex-col rounded-[28px] p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <GlassSelect
                label="Dataset"
                value={dataset}
                onChange={pickDataset}
                options={Object.keys(TABLES)}
              />
              {PRESETS[dataset].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setQuery(p.sql)}
                  className="glass-soft rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* schema hint */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] text-white/35">
              <Database className="h-3.5 w-3.5 text-accent-cyan" />
              <span className="font-mono text-white/55">{dataset}</span>
              <span>(</span>
              {TABLES[dataset].columns.map((c, i) => (
                <span key={c} className="font-mono">
                  {c}
                  {i < TABLES[dataset].columns.length - 1 ? "," : ""}
                </span>
              ))}
              <span>)</span>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") run();
              }}
              spellCheck={false}
              rows={9}
              className="w-full flex-1 resize-none rounded-2xl border border-white/10 bg-obsidian/60 p-4 font-mono text-[13px] leading-relaxed text-accent-cyan/90 outline-none focus:ring-1 focus:ring-accent-blue"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-white/30">⌘/Ctrl + Enter to run</span>
              <button
                onClick={run}
                disabled={running}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Run query
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass flex min-h-[360px] flex-col rounded-[28px] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Result
              </span>
              {ms !== null && rows && (
                <span className="font-mono text-[11px] text-accent-emerald">
                  {rows.length} rows · {ms}ms
                </span>
              )}
            </div>

            {error ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <AlertTriangle className="h-7 w-7 text-[#ff8a8a]" />
                <p className="font-mono text-sm text-[#ff8a8a]">{error}</p>
                <p className="text-xs text-white/35">Tweak the query and run again.</p>
              </div>
            ) : !rows ? (
              <div className="flex flex-1 items-center justify-center text-sm text-white/30">
                Run a query to see results.
              </div>
            ) : (
              <motion.div
                key={JSON.stringify(rows[0]) + rows.length}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col"
              >
                <div className="max-h-[200px] overflow-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-obsidian-soft/90 backdrop-blur">
                      <tr className="text-left text-[11px] uppercase tracking-wider text-white/40">
                        {cols.map((c) => (
                          <th key={c} className="px-3 py-2 font-medium">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 50).map((r, i) => (
                        <tr key={i} className="border-t border-white/[0.06] text-white/75">
                          {cols.map((c) => (
                            <td key={c} className="px-3 py-1.5 font-mono text-xs">
                              {String(r[c])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {chartable && (
                  <div className="mt-4 h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={rows as ResultRow[]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                          dataKey={labelCol}
                          tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          width={40}
                        />
                        <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={darkTooltipStyle} />
                        <Bar dataKey={numCol} fill="#22D3EE" radius={[5, 5, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
