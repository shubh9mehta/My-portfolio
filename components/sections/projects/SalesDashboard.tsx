"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesSampleData, type SalesRow } from "@/data/sample-datasets/salesSampleData";
import { ControlRow, GlassSelect, KeyFindings, darkTooltipStyle } from "./dashboardChrome";
import StakeholderLabel from "@/components/ui/StakeholderLabel";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SalesDashboard() {
  const [region, setRegion] = useState("All");
  const [segment, setSegment] = useState("All");

  const filtered = useMemo(
    () =>
      salesSampleData.filter(
        (r) =>
          (region === "All" || r.region === region) &&
          (segment === "All" || r.segment === segment)
      ),
    [region, segment]
  );

  // Monthly revenue trend
  const trend = useMemo(
    () =>
      MONTHS.map((m) => ({
        month: m,
        revenue: Math.round(
          filtered.filter((r) => r.month === m).reduce((s, r) => s + r.revenue, 0) / 1000
        ),
      })),
    [filtered]
  );

  // Margin by segment+region (find the underperformer)
  const byCombo = useMemo(() => {
    const combos: Record<string, { sum: number; n: number }> = {};
    for (const r of salesSampleData) {
      const k = `${r.region} · ${r.segment}`;
      combos[k] = combos[k] || { sum: 0, n: 0 };
      combos[k].sum += r.margin;
      combos[k].n += 1;
    }
    return Object.entries(combos)
      .map(([k, v]) => ({ combo: k, margin: +(v.sum / v.n).toFixed(1) }))
      .sort((a, b) => a.margin - b.margin);
  }, []);

  const worst = byCombo[0];

  return (
    <div>
      <ControlRow>
        <GlassSelect label="Region" value={region} onChange={setRegion} options={["All", "North", "South", "West"]} />
        <GlassSelect label="Segment" value={segment} onChange={setSegment} options={["All", "Enterprise", "SMB"]} />
        <span className="text-xs text-white/40">
          <StakeholderLabel business="Revenue trend & margin health" technical="Filtered aggregation, monthly rollup" />
        </span>
      </ControlRow>

      <div className="h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
            <Tooltip contentStyle={darkTooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue ($K)"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              dot={{ r: 2, fill: "#8B5CF6" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Margin leaderboard */}
      <div className="mt-5 grid gap-2">
        {byCombo.map((c) => (
          <div key={c.combo} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs text-white/55">{c.combo}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(c.margin / 35) * 100}%`,
                  background: c === worst ? "#F59E0B" : "#10B981",
                }}
              />
            </div>
            <span className="w-10 text-right font-mono text-xs text-white/60">{c.margin}%</span>
          </div>
        ))}
      </div>

      <KeyFindings
        items={[
          <>
            <strong className="text-white">{worst.combo}</strong> is the margin laggard at{" "}
            <strong className="text-white">{worst.margin}%</strong> — a clear turnaround target.
          </>,
          <>Enterprise accounts hold the strongest margins; protect and expand them.</>,
          <>Reusable filter framework cut weekly reporting prep by <strong className="text-white">~35%</strong>.</>,
        ]}
      />
    </div>
  );
}
