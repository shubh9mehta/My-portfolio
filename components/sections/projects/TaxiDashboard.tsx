"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { taxiSampleData, taxiZoneRevenue } from "@/data/sample-datasets/taxiSampleData";
import {
  ControlRow,
  PillToggle,
  KeyFindings,
  darkTooltipStyle,
} from "./dashboardChrome";
import StakeholderLabel from "@/components/ui/StakeholderLabel";

export default function TaxiDashboard() {
  const [metric, setMetric] = useState<"totalRevenue" | "tripCount">("totalRevenue");
  const zones = [...taxiZoneRevenue].sort((a, b) => b.totalRevenue - a.totalRevenue);
  const totalRevM = (taxiZoneRevenue.reduce((s, z) => s + z.totalRevenue, 0) / 1000).toFixed(2);

  return (
    <div>
      <ControlRow>
        <PillToggle
          value={metric}
          onChange={setMetric}
          options={[
            { key: "totalRevenue", label: "Revenue" },
            { key: "tripCount", label: "Trips" },
          ]}
        />
        <span className="text-xs text-white/40">
          <StakeholderLabel
            business="Where & when the money moves"
            technical="Hourly aggregation over 150K+ trips"
          />
        </span>
      </ControlRow>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={taxiSampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="pickupHour"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={darkTooltipStyle} />
            <Bar
              dataKey={metric}
              name={metric === "totalRevenue" ? "Revenue ($K)" : "Trips"}
              fill="#22D3EE"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top zones table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-2.5 font-medium">Zone</th>
              <th className="px-4 py-2.5 text-right font-medium">Revenue ($K)</th>
              <th className="px-4 py-2.5 text-right font-medium">Trips</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.zone} className="border-t border-white/[0.06] text-white/75">
                <td className="px-4 py-2.5 font-medium">{z.zone}</td>
                <td className="px-4 py-2.5 text-right font-mono">{z.totalRevenue.toLocaleString()}</td>
                <td className="px-4 py-2.5 text-right font-mono text-white/50">
                  {z.tripCount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <KeyFindings
        items={[
          <>
            <strong className="text-white">${totalRevM}M+</strong> in fares analyzed across the network.
          </>,
          <>
            <strong className="text-white">Evening rush (5–7pm)</strong> is the single highest-revenue window.
          </>,
          <>
            <strong className="text-white">Manhattan + JFK</strong> drive ~64% of total revenue — prioritize fleet there.
          </>,
        ]}
      />
    </div>
  );
}
